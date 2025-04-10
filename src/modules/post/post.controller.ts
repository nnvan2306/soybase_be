import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
        return this.postService.create(createPostDto, res);
    }

    @Get()
    findAll(@Res() res: Response) {
        return this.postService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.postService.findOne(id, res);
    }

    @Get('/type/:type')
    findByType(@Param('type') type: string, @Res() res: Response) {
        return this.postService.findByType(type, res);
    }

    @Patch('')
    update(@Body() updatePostDto: UpdatePostDto, @Res() res: Response) {
        return this.postService.update(updatePostDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.postService.remove(id, res);
    }
}
