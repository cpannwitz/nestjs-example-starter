import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
@Entity('users') // table name in PG
export class User {
  // ? entity fields
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  // ? account fields - HIDDEN DEFAULT
  @Field(_type => Boolean)
  @Column('boolean', { default: false, select: false })
  verified: boolean

  @Field()
  @Column('text', { select: false })
  provider: string

  @Field()
  @Column('text', { select: false })
  providerId: string

  // ? profile fields
  @Field(_type => [String])
  @Column({ type: 'text', array: true, default: () => "ARRAY['user']::text[]" })
  roles: string[]

  @Field()
  @Column('text')
  email: string

  @Field()
  @Column('text')
  username: string

  @Field(_type => String, { nullable: true })
  @Column('text', { nullable: true })
  image: string | null
}
