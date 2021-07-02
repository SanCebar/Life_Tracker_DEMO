const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Activity {
    static async fetchStatsForUser({ user }) {
        const result = await db.query(
            `
                SELECT SUM(e.duration) AS "exerciseMin"
                FROM users AS u
                    JOIN exercises AS e ON u.id = e.user_id
                WHERE u.id = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        )

        return result.rows[0];
    }
}

class Exercise {
  static async fetchExercisesForUser({ user }) {
    const result = await db.query(
        `
            SELECT * FROM exercises 
            WHERE user_id = (SELECT id FROM users WHERE email = $1)
            ORDER BY timestamp DESC;
        `, [user.email]
    );

    return result.rows;
  }

  static async logNewExercise({ exercise, user }) {
    if (!exercise || !Object.keys(exercise).length) {
      throw new BadRequestError("No exercise info provided");
    }
    if (!user) {
      throw new BadRequestError("No user provided");
    }

    const requiredFields = ["name", "category", "duration", "intensity"];
    requiredFields.forEach((property) => {
      if (!exercise.hasOwnProperty(property)) {
        throw new BadRequestError(`Missing /${property}/ in request body.`);
      }
    });

    //log new exercise
    const result = await db.query(
        `
            INSERT INTO exercises(user_id, name, category, duration, intensity)
            VALUES ((SELECT id FROM users WHERE email = $1), $2, $3, $4, $5)
            RETURNING id,
                      name, 
                      category,
                      duration,
                      intensity,
                      (SELECT username FROM users WHERE email = $1) AS "user";
        `,
        [
            user.email,
            exercise.name,
            exercise.category,
            exercise.duration,
            exercise.intensity
        ]
    )
    return result.rows[0]
  }
}

module.exports = {Activity, Exercise};
