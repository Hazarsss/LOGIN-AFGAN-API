import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseFilters } from "@nestjs/common";
import { UserService } from "./user.service";
import { EntityNotFound } from "./entity-not-found";
import { CreateUserDTO } from "./create-user.dto";

@Controller('users')
@UseFilters(new EntityNotFound)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll() {
        return {
            data: await this.userService.findAll()
        }
    }

    @Post()
    async findUserLogin(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        return {
            data: await this.userService.findUserLogin(email, password)
        }
    }

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return {
            data: await this.userService.create(data)
        }
    }

    @Put(':id')
    async update(@Body() data: CreateUserDTO, @Param('id') id: number) {
        return {
            data: await this.userService.update(data, id)
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number) {
        await this.userService.delete(id);
    }
}