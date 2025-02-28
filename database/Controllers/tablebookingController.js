const TableReservation = require("../Models/TableReservation");
const MaxPersons = require("../Models/MaxPersons"); // assuming you have an AdminSetting model

exports.bookTable = async (req, res) => {

  try {
    // Extract data from the request body
    const { name, email, phone, date, time, persons, description='' } = req.body;

    // Validation (optional, you could also handle this on the frontend)
    if (!name || !email || !phone || !date || !time || !persons) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new booking document
    const newBooking = new TableReservation({
      date,
            time,
            customer: {
              name,
              email,
              phone,
            },
            persons,
            description,
          });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Respond with the saved booking data
    res.status(201).json({
      message: "Table booked successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Booking Error: ", error);
    res.status(500).json({
      message: "Server error, please try again later",
    });
  }
};

  // const { date, time, name, email, phone, address, persons } = req.body;

//   try {
//     // Fetch maximum persons allowed
//     const setting = await MaxPersons.findOne();
//     const maxPersons = setting ? setting.maxPersons : 0;
//     // Calculate total persons booked in the given time span
//     const bookingDate = new Date(date);
//     const bookingTime = new Date(`${date}T${time}`);
//     const twoHoursBefore = new Date(bookingTime.getTime() - 2 * 60 * 60 * 1000);
//     const twoHoursAfter = new Date(bookingTime.getTime() + 2 * 60 * 60 * 1000);

//     const existingBookings = await TableReservation.aggregate([
//       {
//         $match: {
//           date: bookingDate,
//           time: { $gte: twoHoursBefore, $lte: twoHoursAfter },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalPersons: { $sum: "$persons" },
//         },
//       },
//     ]);

//     const totalPersons =
//       existingBookings.length > 0 ? existingBookings[0].totalPersons : 0;

//     if (totalPersons + persons > maxPersons) {
//       return res
//         .status(400)
//         .json({
//           message: `Cannot book more than ${maxPersons} persons in the given time span.`,
//         });
//     }

//     const newBooking = new TableReservation({
//       date,
//       time,
//       customer: {
//         name,
//         email,
//         phone,
//         address,
//       },
//       persons,
//     });

//     await newBooking.save();
//     res.status(201).json({ message: "Table booked successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error booking table.", error });
//   }
// };
// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await TableReservation.find().sort({ date: 1, time: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving bookings.", error });
  }
};
