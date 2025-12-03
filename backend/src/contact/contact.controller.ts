import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Public } from '../auth/auth.decorator'; // ✅ path corretto

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public() // ✅ QUESTA È LA RIGA CHE RISOLVE TUTTO
  @Post()
  async sendMessage(
    @Body() body: { nome: string; email: string; messaggio: string },
  ) {
    await this.contactService.sendEmail(body);
    return { message: '✅ Messaggio inviato con successo' };
  }
}
