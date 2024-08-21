const pg_connection = require('../helpers/postgres')
const app_constants = require('../constants/app.json')


module.exports.addStudent = async (data) => {
    const { full_name, age, gender, father_name } = data;
    const address = data.address ? data.address : ''

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
    const search = data.search ? data.search : ''

    let query = `SELECT * FROM students `
    let total_count_query = `SELECT COUNT(*) FROM students `
    let values = [limit, offset]
    let total_count_values = []

    if (search) {
        query += `WHERE full_name ILIKE $3  OR father_name ILIKE $3 OR address ILIKE $3 `
        total_count_query += `WHERE full_name ILIKE $1  OR father_name ILIKE $1 OR address ILIKE $1 `

        values.push(`%${search}%`)
        total_count_values.push(`%${search}%`)
    }

    query += ` ORDER BY id  limit $1 offset $2`

    const [students_list, total_count_res] = await Promise.all([
        pg_connection.query(query, values),
        pg_connection.query(total_count_query, total_count_values)
    ])

    if (students_list && students_list.rows) {
        return { success: 1, status: app_constants.SUCCESS, message: 'Student list fetched successfully!', total_count: total_count_res.rows.length ? total_count_res.rows[0].count : 0, result: students_list.rows }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
}


module.exports.updateStudent = async (data) => {
    const { id } = data;

    const check_entry_query = `SELECT * FROM students WHERE id = $1`
    const check_entry_res = await pg_connection.query(check_entry_query, [id])

    if (!check_entry_res.rows.length) {
        return { success: 0, status: app_constants.BAD_REQUEST, message: 'id does not exist!' }
    }

    const prev_data = check_entry_res.rows[0]
    const full_name = data.full_name ? data.full_name : prev_data.full_name
    const father_name = data.father_name ? data.father_name : prev_data.father_name
    const age = data.age ? data.age : prev_data.age
    const gender = data.gender ? data.gender : prev_data.gender
    const address = data.address ? data.address : prev_data.address

    const update_query = 'UPDATE students SET full_name = $1, address = $2, age = $3, gender = $4, father_name = $5 WHERE id = $6'
    const values = [full_name, address, age, gender, father_name, id]
    const updated_student = await pg_connection.query(update_query, values)

    if (updated_student && updated_student.rowCount) {
        return { success: 1, status: app_constants.SUCCESS, message: 'Student updated successfully!' }
    }

    return { success: 0, status: app_constants.INTERNAL_SERVER_ERROR, message: 'Internal server error!' }
}