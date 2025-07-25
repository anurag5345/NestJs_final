import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  approved: boolean;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user?.id ?? null) 
  @Expose()
  userId: number;
}
