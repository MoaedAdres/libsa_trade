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
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { AddParticipantDto } from './dto/add-participant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  @Get()
  findAll(@Query('bookingId') bookingId?: number) {
    if (bookingId) {
      return this.conversationsService.findByBooking(bookingId);
    }
    return this.conversationsService.findAll();
  }

  @Get('my-conversations')
  findMyConversations(@CurrentUser() user: any) {
    return this.conversationsService.findByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conversationsService.remove(id);
  }

  // Participant endpoints
  @Post(':id/participants')
  addParticipant(
    @Param('id', ParseIntPipe) conversationId: number,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    return this.conversationsService.addParticipant(
      conversationId,
      addParticipantDto,
    );
  }

  @Delete(':id/participants/:userId')
  removeParticipant(
    @Param('id', ParseIntPipe) conversationId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.conversationsService.removeParticipant(conversationId, userId);
  }

  // Message endpoints
  @Post(':id/messages')
  sendMessage(
    @Param('id', ParseIntPipe) conversationId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.conversationsService.createMessage({
      ...createMessageDto,
      conversationId,
    });
  }

  @Get(':id/messages')
  findMessages(@Param('id', ParseIntPipe) conversationId: number) {
    return this.conversationsService.findMessagesByConversation(conversationId);
  }

  @Get('messages/:messageId')
  findMessage(@Param('messageId', ParseIntPipe) messageId: number) {
    return this.conversationsService.findMessageById(messageId);
  }

  @Patch('messages/:messageId')
  editMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body('body') body: string,
  ) {
    return this.conversationsService.updateMessage(messageId, body);
  }

  @Delete('messages/:messageId')
  deleteMessage(@Param('messageId', ParseIntPipe) messageId: number) {
    return this.conversationsService.deleteMessage(messageId);
  }

  @Patch(':id/read')
  markAsRead(
    @Param('id', ParseIntPipe) conversationId: number,
    @CurrentUser() user: any,
  ) {
    return this.conversationsService.markAsRead(conversationId, user.id);
  }
}
