const Event = require('../models/Event')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
	createEvent(req, res) {
		jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.statusCode(401)
			} else {
				console.log(req)
				const { title, description, price, category, address, seats, date } = req.body
				const { location } = req.file

				const user = await User.findById(authData.user._id)

				if (!user) {
					return res.status(400).json({ message: 'User does not exist!' })
				}

				try {
					const event = await Event.create({
						title,
						description,
						category,
						address,
						seats : parseInt(seats),
						price: parseFloat(price),
						user: authData.user._id,
						thumbnail: location,
						date
					})

					return res.json(event)
				} catch (error) {
					return res.status(400).json({ message: error })
				}
			}
		})

	},

	delete(req, res) {
		jwt.verify(req.token, 'secret', async (err) => {
			if (err) {
				res.statusCode(401)
			} else {
				const { eventId } = req.params
				try {
					await Event.findByIdAndDelete(eventId)
					return res.status(204).send()

				} catch (error) {
					return res.status(400).json({ message: 'We do have any event with the ID' })
				}
			}
		})
	}
}