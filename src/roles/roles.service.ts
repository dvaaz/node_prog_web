import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateRoleDto) {
        const newData = await this.prisma.roles.create({
            data
        })
        return newData;
    }

    async findAll() {
        return await this.prisma.roles.findMany();
    }

    async findOne(id: string) {
        const dataExists = await this.prisma.roles.findUnique({
            where: {
                id
            }
        })
        if (!dataExists) {
            throw new Error('Role not found');
        }
        return dataExists;
    }

    /**
     * Encontrar role por nome
     * @param name 
     * @returns 
     */
    async findByName(name: string) {
        const dataExists = await this.prisma.roles.findUnique({
            where: {
                name
            }
        })
        if (!dataExists) {
            throw new Error('Role not found');
        }
        return dataExists;
    }

    async update(id: string, data: UpdateRoleDto) {
        const dataExists = await this.prisma.roles.findUnique({
            where: {
                id
            }
        })
        if (!dataExists) {
            throw new Error('Role not found');
        }
        return this.prisma.roles.update({
            where: {
                id
            },
            data
        })
    }

    async remove(id: string) {
        const dataExists = await this.prisma.roles.findUnique({
            where: {
                id
            }
        })
        if (!dataExists) {
            throw new Error('Role not found');
        }
        return this.prisma.roles.delete({
            where: {
                id
            }
        })
    }
}
