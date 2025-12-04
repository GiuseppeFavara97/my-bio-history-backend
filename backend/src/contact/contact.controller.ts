import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Public } from '../auth/auth.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public() 
  @Post()
  async sendMessage(
    @Body() body: { nome: string; email: string; messaggio: string },
  ) {
    await this.contactService.sendEmail(body);
    return { message: '✅ Messaggio inviato con successo' };
  }
}
