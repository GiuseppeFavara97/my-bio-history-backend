import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDto } from './dto/patient.dto';
import { User } from 'src/users/user.entity';
import {ItalyCities} from '../common/utils/italyCities';
import { UserSex } from 'src/users/enum/userSex.enum';
import { UserDto } from 'src/users/dto/user.dto';



@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) { }
  async createPatient(patientDto: PatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(patientDto);
    return this.patientRepository.save(patient);

  }
  async findAllPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }
  async findPatientById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }
  async updatePatient(id: number, patientDto: Patient): Promise<Patient> {
    await this.patientRepository.update(id, patientDto);
    return this.findPatientById(id);
  }
  async deletePatient(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  generateTaxCode(dto:UserDto): string | void {
    const { firstName, lastName, province, birthday, birthdayPlace, sex} = dto;
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
    const lettere = lastName.toUpperCase().replace(/[^A-Z]/g, ''); 
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

function estraiCodiceDaCognome(lastName: string): string {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const lettere = lastName.toUpperCase().replace(/[^A-Z]/g, ''); // Rimuove caratteri non alfabetici
    const consonanti: string[] = [];
    const vocalilastName: string[] = [];

    for (const lettera of lettere) {
        if (vowels.includes(lettera)) {
            vocalilastName.push(lettera);
        } else {
            consonanti.push(lettera);
        }
    }

    let risultato = '';

    // Aggiungi fino a 3 consonanti
    risultato = consonanti.slice(0, 3).join('');

    // Se non bastano, aggiungi vocali
    if (risultato.length < 3) {
        for (const vowel of vocalilastName) {
            if (risultato.length < 3) {
                risultato += vowel;
            }
        }
    }

    // Se ancora meno di 3 caratteri, aggiungi 'X'
    while (risultato.length < 3) {
        risultato += 'X';
    }

    return risultato;
}

function estraiCodiceData(
    birthday: string, // formato: "YYYY-MM-DD"
    sesso: 'M' | 'F'
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

    const [annoStr, meseStr, giornoStr] = birthday.split('-');
    const year = annoStr.slice(-2); // ultime due cifre
    const month = mesiCodice[parseInt(meseStr, 10)];
    let day = parseInt(giornoStr, 10);

    if (sesso === 'F') {
        day += 40;
    }

    const giornoCodificato = day.toString().padStart(2, '0');

    return year + month + giornoCodificato;
  }
  const catastalCode = (comune: string): string | null => {
     function catastalCode(Comune: string): string | null {
        const codiceComune = ItalyCities.catastalCode(Comune);
        if (!codiceComune) {
            return null;
        }
        return codiceComune;
    }
  
  const codiceFiscale = ItalyCities.catastalCode(comune);
  if (!codiceFiscale) {
      throw new NotFoundException(`Codice catastale non trovato per il comune: ${comune}`);
    }
  return codiceFiscale;
}
}

  async findPatientsByMainPatientId(mainPatientId: number): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { mainPatientId } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found for main patient ID ${mainPatientId}`);
    }
    return patients;
  }
  async findPatientsByUserId(userId: number): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { userId } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found for user ID ${userId}`);
    }
    return patients;
  }
  async findPatientsByFullName(fullName: string): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { fullName } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found with full name ${fullName}`);
    }
    return patients;
  }
  
  async findPatientsByRelationToMainPatient(relationToMainPatient: string): Promise<Patient[]> {
    const patients = await this.patientRepository.find({ where: { relationToMainPatient } });
    if (patients.length === 0) {
      throw new NotFoundException(`No patients found with relation to main patient ${relationToMainPatient}`);
    }
    return patients;
  }
}

