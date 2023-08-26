import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:
        Repository<User>) { }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneByOrFail({ id: id });
    }

    findUserLogin(email: string, password: string) {
        return this.userRepository.findOneByOrFail({ email: email, password: password });
    }

    create(data: CreateUserDTO) {
        const user = new User();
        user.email = data.email;
        user.password = data.password;
        user.isActive = data.isActive;
        return this.userRepository.save(user);
    }

    update(data: CreateUserDTO, id: number) {
        return this.userRepository.save({ ...data, id: Number(id) })
    }

    delete(id: number) {
        return this.userRepository.delete(id)
    }
}