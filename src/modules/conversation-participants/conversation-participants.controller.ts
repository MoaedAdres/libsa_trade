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
import { ConversationParticipantsService } from './conversation-participants.service';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('conversation-participants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConversationParticipantsController {
  constructor(
    private readonly conversationParticipantsService: ConversationParticipantsService,
  ) {}

  @Post()
  create(
    @Body() createConversationParticipantDto: CreateConversationParticipantDto,
  ) {
    return this.conversationParticipantsService.create(
      createConversationParticipantDto,
    );
  }

  @Get()
  findAll(
    @Query('conversationId') conversationId?: number,
    @Query('userId') userId?: number,
  ) {
    if (conversationId) {
      return this.conversationParticipantsService.findByConversation(
        conversationId,
      );
    }
    if (userId) {
      return this.conversationParticipantsService.findByUser(userId);
    }
    return this.conversationParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversationParticipantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversationParticipantDto: UpdateConversationParticipantDto,
  ) {
    return this.conversationParticipantsService.update(
      id,
      updateConversationParticipantDto,
    );
  }

  @Patch(':id/toggle-mute')
  toggleMute(@Param('id', ParseIntPipe) id: number) {
    return this.conversationParticipantsService.toggleMute(id);
  }

  @Patch('mark-read/:conversationId/:userId')
  markAsRead(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.conversationParticipantsService.markAsRead(
      conversationId,
      userId,
    );
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conversationParticipantsService.remove(id);
  }
}
