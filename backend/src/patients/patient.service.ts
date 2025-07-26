import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientDto } from './dto/patient.dto';
import { User } from 'src/users/user.entity';
import {ItalyCities} from '../common/utils/italyCities';
import { UserSex } from 'src/users/enum/userSex.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { Comune } from 'codice-fiscale-js/types/comune';



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
    const { firstName, lastName, birthday, birthdayPlace, sex} = dto;
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

function estraiCodiceData(
    birthday: string, // formato: "YYYY-MM-DD"
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

    const [yearStr, monthStr, dayStr] = birthday.split('-');
    const year = yearStr.slice(-2); // ultime due cifre
    const month = mesiCodice[parseInt(monthStr, 10)];
    let day = parseInt(dayStr, 10);

    if (sex === 'F') {
        day += 40;
    }

    const giornoCodificato = day.toString().padStart(2, '0');

    return year + month + giornoCodificato;
  }


calculateControlChar(code: string): string {
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

  const catastalCode = (comune: string) => {
     function catastalCode(comune: string) {
        const codiceComune = ItalyCities.catastalCode(comune);
        if (!codiceComune) {
            return null;
        }
        return codiceComune;
      }

  const codiceComune = ItalyCities.catastalCode(birthdayPlace?);
  if (!codiceComune) {
      throw new NotFoundException(`Codice catastale non trovato per il comune: ${comune}`);
  }
  
  
     return( 
    codeLastName(lastName) +
    codeFirstName(firstName) +
    estraiCodiceData (birthday?, sex?) +
    catastalCode
);
  
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

