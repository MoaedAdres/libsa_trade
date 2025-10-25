import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('messages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll(
    @Query('conversationId') conversationId?: number,
    @Query('senderId') senderId?: number,
  ) {
    if (conversationId) {
      return this.messagesService.findByConversation(conversationId);
    }
    if (senderId) {
      return this.messagesService.findBySender(senderId);
    }
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Get(':id/replies')
  findReplies(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findReplies(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Patch(':id/redact')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  redact(
    @Param('id', ParseIntPipe) id: number,
    @Body('reason') reason: string,
  ) {
    return this.messagesService.redact(id, reason);
  }

  @Patch(':id/flag-contact')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  flagContact(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.flagContact(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
