class DbHandler {
  constructor(db_client) {
    this.db_client = db_client;
  }

  async addUser(number) {
    try {
      await this.this.db_client.query(
        `
            INSERT INTO kk(number)
            VALUES (${number});
        `
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllUsers() {
    try {
      const users = (
        await this.db_client.query(`
            SELECT * FROM kk;
          `)
      ).rows.map((num) => `+234${num.number}`);
      return users;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async removeUser(number) {
    try {
      await this.db_client.query(`
            DELETE FROM kk
            WHERE number = "${number.split('+')[1]}";
          `);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = DbHandler;
