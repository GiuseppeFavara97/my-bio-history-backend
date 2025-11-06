import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { ItalyCities } from 'src/common/utils/italyCities';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';
import * as bcrypt from 'bcrypt';
import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class UserService {
    // Metodo non implementato, da rimuovere o implementare se necessario
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Doctor)
        private doctorRepository: Repository<any>,
        @InjectRepository(Patient)
        private patientRepository: Repository<any>,
        private doctorService: DoctorService,
        private patientService: PatientService,

    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const taxCodeResult = await this.generateTaxCode(userDto);
        const user = this.userRepository.create({
            password: hashedPassword,
            email: userDto.email,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            birthday: userDto.birthday,
            birthdayPlace: userDto.birthdayPlace,
            province: userDto.province,
            sex: userDto.sex,
            phoneNumber: userDto.phoneNumber,
            role: userDto.role,
            taxCode: taxCodeResult.taxCode,
            username: await this.generateUserName(userDto)
        });

        if (userDto.role === UserRole.DOCTOR && userDto.doctor) {

            const doctor = await this.doctorService.createDoctor(userDto.doctor);
            doctor.user = user;
            user.doctor = doctor;
        }

        if (userDto.role === UserRole.PATIENT && userDto.patient) {

            const patient = await this.patientService.createPatient(userDto.patient);
            patient.user = user;
            user.patient = patient;
        }

        const savedUser = await this.userRepository.save(user);

        if (savedUser.patient) {
            (savedUser.patient as any).user = undefined;
        }
        if (savedUser.doctor) {
            (savedUser.doctor as any).user = undefined;
        }

        return savedUser;
    }

    //Genera uno username univoco basato su nome e cognome
    async generateUserName(user: UserDto): Promise<string> {
        const base = `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`;
        let suffix = 0;
        let username: string;
        do {
            username = `${base}${suffix.toString().padStart(4, '0')}`;
            // eslint-disable-next-line no-await-in-loop
            const exists = await this.userRepository.findOne({ where: { username } });
            if (!exists) break;
            suffix++;
        } while (true);
        return username;
    }
  
    async generateTaxCode(dto: UserDto): Promise<{ taxCode: string; verification: string }> {
        const { firstName, lastName, birthday, birthdayPlace, sex } = dto;
        const clean = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, '');
        const extract = (s: string, chars: string) => clean(s).split('').filter(c => chars.includes(c)).join('');
        const codeName = (s: string, isFirst = false) => {
            const cons = extract(s, 'BCDFGHJKLMNPQRSTVWXYZ');
            if (isFirst && cons.length >= 4) return cons[0] + cons[2] + cons[3];
            const vow = extract(s, 'AEIOU');
            return (cons + vow + 'XXX').substring(0, 3);
        };
        const monthCode = ['A','B','C','D','E','H','L','M','P','R','S','T'];
        const dateObj = birthday instanceof Date ? birthday : new Date(birthday);
        const year = dateObj.getFullYear().toString().slice(-2);
        const month = monthCode[dateObj.getMonth()];
        let day = dateObj.getDate();
        if (sex === 'F') day += 40;
        const dayCode = day.toString().padStart(2, '0');
        const catastalCode = ItalyCities.catastalCode(birthdayPlace);
        if (!catastalCode) throw new NotFoundException(`Codice catastale non trovato per il comune: ${birthdayPlace}`);
        const partial = codeName(lastName) + codeName(firstName, true) + year + month + dayCode + catastalCode;
        const evenMap = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, c, i) => (acc[c] = i, acc), {} as Record<string, number>);
        const oddArr = [1,0,5,7,9,13,15,17,19,21,1,0,5,7,9,13,15,17,19,21,2,4,18,20,11,3,6,8,12,14,16,10,22,25,24,23];
        const oddMap = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, c, i) => (acc[c] = oddArr[i], acc), {} as Record<string, number>);
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let sum = 0;

        // La posizione per il carattere di controllo è 1-based: dispari/pari secondo la normativa
        for (let i = 0; i < partial.length; i++) {
            const char = partial[i];
            sum += (i % 2 === 0) ? evenMap[char] : oddMap[char];
        }
        const controlChar = alphabet[sum % 26];
    let taxCodeGenerated = partial + controlChar;
    if (taxCodeGenerated.length !== 16) throw new Error(`Il formato del codice fiscale non  è corretto: ${taxCodeGenerated}`);
        
        try {
            const verify = await this.verificaCodiceFiscale(taxCodeGenerated);
            if (verify.valid) {
                return { taxCode: taxCodeGenerated, verification: "Valido" };
            } else {
                return { taxCode: taxCodeGenerated, verification: "Non valido" };
            }
        } catch (error: any) {
            return { taxCode: taxCodeGenerated, verification: `Verifica non disponibile: ${error.message}` };
        }
    }

    async verificaCodiceFiscale(cf: string): Promise<any> {
        const apiUrl = process.env.OPENAPI_API_URL_CHECK_TAXCODE_PRODUCTION || process.env.OPENAPI_API_URL_CHECK_TAXCODE_TEST;
        const token = process.env.OPENAPI_TOKEN_CHECK_TAXCODE_PRODUCTION || process.env.OPENAPI_TOKEN_CHECK_TAXCODE_TEST;

        if (!apiUrl) throw new Error("OPENAPI_API_URL non configurato nel .env");
        if (!token) throw new Error("OPENAPI_TOKEN non configurato nel .env");
        
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl!, {
            method: "POST",
            headers,
            body: JSON.stringify({ taxCode: cf })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Errore durante la verifica CF");
        }
        return data;
    }

    //Restituisce tutti gli utenti
    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    //Trova un utente per ID, lancia NotFound se non esiste
    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }

    //Trova un utente per email
    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    //Aggiorna un utente e restituisce il nuovo oggetto
    async updateUser(id: number, userDto: UserDto): Promise<User> {
        await this.userRepository.update(id, userDto);
        return this.findUserById(id);
    }

    // Soft delete di un utente e delle entità collegate
    async softDeleteUser(id: number): Promise<User> {
        const user = await this.findUserById(id);
        await this.userRepository.update(id, { softDeleted: true });
        if (user.role === UserRole.DOCTOR) {
            await this.doctorRepository.update({ user: { id: user.id } }, { deleted: true });
        } else if (user.role === UserRole.PATIENT) {
            await this.patientRepository.update({ user: { id: user.id } }, { deleted: true });
        }
        return this.findUserById(id);
    }

    //Trova un utente per email (ignora password, per compatibilità)
    async findOne(email: string, _password: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }

    //Aggiorna l'immagine profilo dell'utente
    async updateProfileImage(id: number, imageUrl: string): Promise<void> {
        await this.userRepository.update({ id }, { profileImageUrl: imageUrl });
    }

    //Restituisce i dati dell'utente loggato
    async loggedUser(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }
}