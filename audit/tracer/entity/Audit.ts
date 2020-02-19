import { Column, Entity } from "typeorm";
import { PrimaryColumn } from "typeorm";
import { Generated } from "typeorm";

@Entity("audits")
export default class Audit {

    @PrimaryColumn("integer")
    @Generated()
    id: number;

    @Column()
    why: string;
    @Column()
    where: string;
    @Column()
    what: string;
    @Column()
    when: string;
    @Column()
    severity: string;
    @Column()
    type: string;
    @Column()
    subject: string;
    @Column()
    meta: string;
}