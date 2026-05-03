import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @Post()
      create(@Body() data: CreateRoleDto) {
        return this.rolesService.create(data);
      }
    
      @Get()
      findAll() {
        return this.rolesService.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
        return this.rolesService.update(id, data);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.rolesService.remove(id);
      }
    }
    