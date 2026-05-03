import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private rolesService: RolesService) { }

  /**
   * Creates new user and puts a DATE  in the fiel createdAt and updatedAt in the database
   * @param data 
   * @returns 
   */
  async create(data: CreateUserDto) {
    const roleExists = await this.rolesService.findOne(data.roleId);
    if (!roleExists) {
      throw new Error('Role not found');
    }

    const newData = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        roles: {
          connect: {
            id: data.roleId
          },
        },
      },
    })
    return newData;
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: number) {
    const dataExists = await this.prisma.users.findUnique({
      where: {
        id
      }
    })
    return dataExists;
  }

  update(id: number, data: UpdateUserDto) {
    const dataExists = this.prisma.users.findUnique({
      where: {
        id
      }
    })
    if (!dataExists) {
      throw new Error('User not found');
    }
    return this.prisma.users.update({
      where: {
        id
      },
      data
    });
  }

  remove(id: number) {
    const dataExists = this.prisma.users.findUnique({
      where: {
        id
      }
    })
    if (!dataExists) {
      throw new Error('User not found');
    }
    return this.prisma.users.delete({
      where: {
        id
      }
    })
  }
}

