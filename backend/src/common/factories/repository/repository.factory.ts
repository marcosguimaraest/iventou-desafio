import { Inject } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";

export abstract class RepositoryFactory<E> {
	@Inject(PrismaService)
	public readonly prismaService: PrismaService;

	constructor(public model: string) {}

	create<T>(createDto: T): Promise<E> {
		return (this.prismaService as any)[this.model].create({
			data: createDto,
		});
	}

	createMany<T>(createDtos: T[]): Promise<E[]> {
		return (this.prismaService as any)[this.model].createMany({
			data: createDtos,
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
