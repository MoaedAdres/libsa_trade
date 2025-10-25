import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FileOwnerType, FileType } from '../../common/enums';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('ownerType') ownerType: FileOwnerType,
    @Query('ownerId') ownerId: number,
    @Query('fileType') fileType: FileType,
    @CurrentUser() user: any,
  ) {
    return this.filesService.uploadFile(
      file,
      ownerType,
      ownerId,
      fileType,
      user.id,
    );
  }

  @Get('entity/:ownerType/:ownerId')
  async getFilesForEntity(
    @Param('ownerType') ownerType: FileOwnerType,
    @Param('ownerId', ParseIntPipe) ownerId: number,
  ) {
    return this.filesService.getFilesForEntity(ownerType, ownerId);
  }

  @Delete(':id')
  async deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.deleteFile(id);
  }
}
