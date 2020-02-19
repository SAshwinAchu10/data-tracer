export default {
    name: "Audit",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        what: {
            type: "varchar"
        },
        why: {
            type: "varchar"
        },
        where: {
            type: "varchar"
        },
        subject: {
            type: "varchar"
        },
        severity: {
            type: "varchar"
        },
        type: {
            type: "varchar"
        },
        when: {
            type: "varchar"
        },
        meta: {
            type: "varchar"
        }
    }
};