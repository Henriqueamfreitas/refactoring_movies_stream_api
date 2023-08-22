import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movies') // A entidade books vai ser a minha tabela
class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string 

    @Column({ type: 'text' })
    description: string 

    @Column({ type: 'integer' })
    duration: number 

    @Column({ type: 'integer' })
    price: number 
}

export default Movie;

