import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRole } from './enum/userRole.enum';
import { DoctorService } from '../doctors/doctor.service';
import { PatientService } from '../patients/patient.service';
import { ItalyCities } from 'src/common/utils/italyCities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    users: any;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private doctorService: DoctorService,
        private patientService: PatientService,

    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userDto.password, 10);

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
            taxCode: this.generateTaxCode(userDto),

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

    generateTaxCode(dto: UserDto): string {
        const { firstName, lastName, birthday, birthdayPlace, sex } = dto;
        const vowels = 'AEIOU';
        const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
        const clean = (s: string) => s.toUpperCase().replace(/[^A-Z]/g, '');
        const extractConsonants = (s: string) =>
            clean(s)
                .split('')
                .filter((c) => consonants.includes(c))
                .join('');
        const extractVowels = (s: string) =>
            clean(s)
                .split('')
                .filter((c) => vowels.includes(c))
                .join('');

        const codeLastName = (s: string) =>
            (extractConsonants(s) + extractVowels(s) + 'XXX').substring(0, 3);

        const codeFirstName = (s: string) => {
            const cons = extractConsonants(s);
            if (cons.length >= 4) return cons[0] + cons[2] + cons[3];
            return (cons + extractVowels(s) + 'XXX').substring(0, 3);
        };

        function estraiCodiceDaNome(firstName: string): string {
            const vowels = ['A', 'E', 'I', 'O', 'U'];
            const lettere = firstName.toUpperCase().replace(/[^A-Z]/g, '');
            const consonanti: string[] = [];
            const vocalifirstName: string[] = [];

            for (const lettera of lettere) {
                if (vowels.includes(lettera)) {
                    vocalifirstName.push(lettera);
                } else {
                    consonanti.push(lettera);

                }
            }

            let risultato = '';

            if (consonanti.length >= 4) {
                // Se ci sono almeno 4 consonanti, prendi la 1a, 3a e 4a
                risultato = consonanti[0] + consonanti[2] + consonanti[3];
            } else {
                // Prendi tutte le consonanti disponibili
                risultato = consonanti.join('');
                // Completa con vocali se non bastano
                for (const vocale of vocalifirstName) {
                    if (risultato.length < 3) {
                        risultato += vocale;
                    }
                }
                // Se ancora meno di 3 lettere, aggiungi X
                while (risultato.length < 3) {
                    risultato += 'X';
                }
            }

            return risultato;
        }

        function estraiCodiceData(
            birthday: string | Date, // formato: "YYYY-MM-DD"
            sex: 'M' | 'F'
        ): string {
            const mesiCodice: { [key: number]: string } = {
                1: 'A',
                2: 'B',
                3: 'C',
                4: 'D',
                5: 'E',
                6: 'H',
                7: 'L',
                8: 'M',
                9: 'P',
                10: 'R',
                11: 'S',
                12: 'T',
            };

            const dateObj = birthday instanceof Date ? birthday : new Date(birthday);
            const year = dateObj.getFullYear().toString().slice(-2); // ultime due cifre
            const month = mesiCodice[dateObj.getMonth() + 1];
            let day = dateObj.getDate();

            if (sex === 'F') {
                day += 40;
            }

            const giornoCodificato = day.toString().padStart(2, '0');


            return `${year}${month}${giornoCodificato}`;


        };


        const calculateControlChar = (code: string) => {
            const evenMap: Record<string, number> = {
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
                A: 0,
                B: 1,
                C: 2,
                D: 3,
                E: 4,
                F: 5,
                G: 6,
                H: 7,
                I: 8,
                J: 9,
                K: 10,
                L: 11,
                M: 12,
                N: 13,
                O: 14,
                P: 15,
                Q: 16,
                R: 17,
                S: 18,
                T: 19,
                U: 20,
                V: 21,
                W: 22,
                X: 23,
                Y: 24,
                Z: 25,
            };

            const oddMap: Record<string, number> = {
                '0': 1,
                '1': 0,
                '2': 5,
                '3': 7,
                '4': 9,
                '5': 13,
                '6': 15,
                '7': 17,
                '8': 19,
                '9': 21,
                A: 1,
                B: 0,
                C: 5,
                D: 7,
                E: 9,
                F: 13,
                G: 15,
                H: 17,
                I: 19,
                J: 21,
                K: 2,
                L: 4,
                M: 18,
                N: 20,
                O: 11,
                P: 3,
                Q: 6,
                R: 8,
                S: 12,
                T: 14,
                U: 16,
                V: 10,
                W: 22,
                X: 25,
                Y: 24,
                Z: 23,
            };

            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let sum = 0;

            for (let i = 0; i < code.length; i++) {
                const char = code[i];
                sum += i % 2 === 0 ? oddMap[char] : evenMap[char];
            }

            return alphabet[sum % 26];

        }

        const catastalCode = ItalyCities.catastalCode(birthdayPlace);


        if (!catastalCode) {
            throw new NotFoundException(`Codice catastale non trovato per il comune: ${birthdayPlace}`);
        }


        return (
            codeLastName(lastName) +
            codeFirstName(firstName) +
            estraiCodiceData(birthday, sex) +
            catastalCode +
            calculateControlChar(
                codeLastName(lastName) +
                codeFirstName(firstName) +
                estraiCodiceData(birthday, sex) +
                catastalCode
            )
        );
    }


    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findUsersByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async updateUser(id: number, userDto: UserDto): Promise<User> {
        await this.userRepository.update(id, userDto);
        return this.findUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async findOne(email: string, password: string): Promise<User | undefined> {
        // logica per trovare l'utente
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }
}

