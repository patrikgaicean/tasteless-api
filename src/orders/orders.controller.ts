import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RequestWithUserDto } from '../auth/interfaces/requestWithUser.interface';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: RequestWithUserDto, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllForUser(@Req() req: RequestWithUserDto) {
    return this.ordersService.findAllForUser(req.user.userId);
  }

  @Get(':id/details')
  @UseGuards(JwtAuthGuard)
  findOneDetailsForUser(@Req() req: RequestWithUserDto, @Param('id') id: string) {
    return this.ordersService.findOneDetailsForUser(+id, req.user.userId);
  }

}
