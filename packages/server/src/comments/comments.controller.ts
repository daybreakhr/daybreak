import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserRecord } from 'firebase-admin/auth'
import { GetUser } from 'src/auth/get-user.decorator'
import { CommentsService } from './comments.service'
import { CommentDto, CreateCommentDto } from './comments.dto'

@ApiTags('Comments')
@ApiSecurity('access-key')
@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('')
  @ApiBody({ type: CreateCommentDto })
  @ApiOperation({ summary: 'Create a comment' })
  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: CommentDto,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.commentsService.createComment(
      createCommentDto,
      user.uid,
    )
    return data
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiOkResponse({
    description: 'comment deleted successfully',
    type: CommentDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  async deleteFeedback(@Param('id') id: string) {
    const data = await this.commentsService.deleteComment(id)
    return data
  }
}
