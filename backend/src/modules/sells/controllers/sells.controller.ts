import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SellsService } from '../services/sells.service';

@ApiTags('sells')
@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @ApiOperation({ summary: 'Sincronizar vendas por data' })
  @Get()
  async sellsByDate(@Query('fromDate') fromDate?: string) {
    return this.sellsService.sellsByDate(fromDate);
  }

  @ApiOperation({ summary: 'Sincronizar todas as vendas' })
  @Get('syncro')
  async syncroAllSells() {
    const resultMessage = await this.sellsService.syncroSells();
    return { message: resultMessage };
  }

  @ApiOperation({ summary: 'Obter venda por ID' })
  @Get(':id')
  async getSellById(@Param('id') id: number) {
    return this.sellsService.getSellById(id);
  }
}
