import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';

@Controller('wishlist')
@ApiTags('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUserDto, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllForUser(@Req() req: RequestWithUserDto) {
    return this.wishlistService.findAllForUser(req.user.userId);
  }
  
  @Get(':discId')
  @UseGuards(JwtAuthGuard)
  findByDiscId(@Req() req: RequestWithUserDto, @Param('discId') discId: string) {
    return this.wishlistService.findByDiscId(+discId, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: RequestWithUserDto, @Param('id') id: string) {
    return this.wishlistService.removeForUser(+id, req.user.userId);
  }

}
