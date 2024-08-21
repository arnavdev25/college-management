const pg_connection = require('../helpers/postgres')
const app_constants = require('../constants/app.json')


module.exports.addStudent = async (data) => {
    const { full_name, address, age, gender, father_name } = data;

    const query = `INSERT INTO students (full_name, address, age, gender, father_name) VALUES($1, $2, $3, $4, $5)`
    const values = [full_name, address, age, gender, father_name]
    const add_student = await pg_connection.query(query, values)

    if (add_student && add_student.rowCount) {
        return { success: 1, status: app_constants.SUCCESS, message: 'Student added successfully!' }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
}


module.exports.studentList = async (data) => {
    const limit = data.limit ? data.limit : 100000;
    const offset = data.offset ? data.offset : 0;

    const query = `SELECT * FROM students limit $1 offset $2`
    const total_count_query = `SELECT COUNT(*) FROM students`

    const [students_list, total_count_res] = await Promise.all([
        pg_connection.query(query, [limit, offset]),
        pg_connection.query(total_count_query, [])
    ])

    if (students_list && students_list.rows) {
        return { success: 1, status: app_constants.SUCCESS, message: 'Student list fetched successfully!', total_count: total_count_res.rows.length ? total_count_res.rows[0].count : 0, result: students_list.rows }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
}