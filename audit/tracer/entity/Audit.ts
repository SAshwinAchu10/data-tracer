import 'reflect-metadata'
import { Column, Entity } from "typeorm";
import { PrimaryColumn } from "typeorm";
import { Generated } from "typeorm";

@Entity("audits")
export default class Audit {

    @PrimaryColumn("integer")
    @Generated()
    id: number;
    @Column('text',{nullable:true})
    why: string;
    @Column('text',{nullable:true})
    where: string;
    @Column('text',{nullable:true})
    what: string;
    @Column('text',{nullable:true})
    when: string;
    @Column('text',{nullable:true})
    severity: string;
    @Column('text',{nullable:true})
    type: string;
    @Column('text',{nullable:true})
    subject: string;
    @Column('text',{nullable:true})
    meta: string;
}