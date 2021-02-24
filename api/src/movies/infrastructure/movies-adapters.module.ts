import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieCollectionEntity } from './movie-collection.entity';
import { MovieEntity } from './movie.entity';
import { MovieCollectionRepository } from '../application';
import { TypeormMovieCollectionRepository } from './typeorm-movie-collection.repository';
import { MoviesDomainModule } from '../domain';
import { DetailsEntity } from './details.entity';
import { DetailsRepository } from '../application/details.repository';
import { TypeormDetailsRepository } from './typeorm-details.repository';
import { DetailsService } from '../application/details.service';
import { OmdbDetailsService } from './omdb-details.service';
import { ConfigModule } from '@nestjs/config';
import { omdbConfig } from './omdb.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieCollectionEntity,
      MovieEntity,
      DetailsEntity,
    ]),
    MoviesDomainModule,
    HttpModule,
    ConfigModule.forFeature(omdbConfig),
  ],
  providers: [
    {
      provide: MovieCollectionRepository,
      useClass: TypeormMovieCollectionRepository,
    },
    {
      provide: DetailsRepository,
      useClass: TypeormDetailsRepository,
    },
    {
      provide: DetailsService,
      useClass: OmdbDetailsService,
    },
  ],
  exports: [MovieCollectionRepository, DetailsRepository, DetailsService],
})
export class MoviesAdaptersModule {}
