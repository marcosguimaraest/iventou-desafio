import { Inject } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

export abstract class RepositoryFactory<E> {
	@Inject(PrismaService)
	public readonly prismaService: PrismaService;

	constructor(public model: string) {}

	create<T>(createDto: T): Promise<E> {
		return (this.prismaService as any)[this.model].create({
			data: {
				...createDto,
				deletedAt: null,
			},
		});
	}

	createMany<T>(createDtos: T[]): Promise<E[]> {
		const dto = createDtos.map((createDto) => ({
			...createDto,
			deletedAt: null,
		}));

		return (this.prismaService as any)[this.model].createMany({
			data: dto,
		});
	}

	findAll(): Promise<E[]> {
		return (this.prismaService as any)[this.model].findMany();
	}

	findManyWithIds(ids: string[]): Promise<E[]> {
		return (this.prismaService as any)[this.model].findMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}

	findById(id: string): Promise<E> {
		return (this.prismaService as any)[this.model].findFirst({
			where: {
				id,
				deletedAt: null,
			},
		});
	}

	update<T>(updateDto: T): Promise<E> {
		const { id, ...updateInput } = updateDto as any;

		return (this.prismaService as any)[this.model].update({
			where: {
				id,
			},
			data: {
				...updateInput,
				updatedAt: new Date(),
			},
		});
	}

	softDelete(id: string): Promise<E> {
		return (this.prismaService as any)[this.model].update({
			where: {
				id,
			},
			data: {
				deletedAt: new Date(),
				updatedAt: new Date(),
			},
		});
	}

	delete(id: string): Promise<E> {
		return (this.prismaService as any)[this.model].delete({
			where: {
				id,
			},
		});
	}
}
