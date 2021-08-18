//The boilerplate schema :

//const userSchema = new Schema({
//     username: { type: String, lowercase: true, required: true, unique: true, immutable: true },
//     username_case: { type: String, required: true },
//     password: { type: String, required: true },
//     profile_pic: { type: String },
//     first_name: { type: String, maxlength: 20 },
//     last_name: { type: String, maxlength: 20 },
//     bio: { type: String, maxlength: 240 },
//     created_at: { type: Date, default: Date.now, immutable: true },
//     updated_at: { type: Date },
//   }, { versionKey: false });


const { ObjectID } = require('bson');
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = {discriminatorKey: 'kind'};

const userSchema = new Schema({
    email: { type: String, lowercase: true, required: true, unique: true, immutable: true },
    email_case: { type: String, required: true },
    password: { type: String, required: true }, // maybe to give initial psw or to add a special boolean flag for inserting new mentee
    first_name: { type: String, maxlength: 20 },
    last_name: { type: String, maxlength: 20 },
    //bio: { type: String, maxlength: 240 },   ?is this reqired
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
    profile: { type: ObjectID, refPath: 'role' }
    }, options);
 
const User = mongoose.model('User', userSchema);

const Mentee = User.discriminator('Mentee', new Schema({
    dashboardFields: [{type: String}],
    mentors: [{ type: ObjectID, ref: 'Mentor' }]
}, options));

const Mentor = User.discriminator('Mentor', new Schema({
    Admin: {type: Boolean},

// should we add mentees or not? or using query to find them
}, options));


const mentee = new Mentee({
        email: "john@gmail.com",
        email_case: "john@gmail.com", //?
        password: "123",
        first_name: "ורד",
        last_name: "וייס",
        dashboardFields: ["לימודים","צבא"]
    });
    
    // console.log(mentee.kind) 
    // console.log(mentee)   

    const mentor = new Mentor({
        email: "mentor@gmail.com",
        email_case: "mentor@gmail.com", //?
        password: "123",
        first_name: "mentor",
        last_name: "וייס",
        Admin: 'false'
    });
    
    // console.log(mentee.kind) 
    // console.log(mentee)   

    // console.log(mentor.kind) 
    // console.log(mentor)   

    // connect to DB
    var uri = "mongodb://localhost:27017/details";

    const database = mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

    const connection = mongoose.connection;

    connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
    });
      
    if (false){
    mentee.save()
    .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })

      mentor.save()
    .then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })
    }

      const mentor_email = "mentor@gmail.com"; 
    
      const MentorId = User.find({email : mentor_email }, function(err, result) {
        if (err) {
          console.error(err);
        } else {
            console.log(result[0]._id);
            const mentee2 = new Mentee({
                email: "lala@gmail.com",
                email_case: "lala@gmail.com", //?
                password: "123",
                first_name: "ורד",
                last_name: "וייס",
                dashboardFields: ["לימודים","צבא"],
                mentors: [result[0]._id]
        
            });
            mentee2.save()
            
        
        }
      });
     
      
        
      
    
    // console.log(mentee.kind) 
    // console.log(mentee)   

    //User.save(mentee)
//  Example 1: 
//    const options = {discriminatorKey: 'kind'};

// const UserSchema = new Schema({
//     name: String,
//     email: String,
//     password: String,
//     /* role: String, Student or Teacher <-- NO NEED FOR THIS. */
//     profile: { type: ObjectID, refPath: 'role' }
// }, options);

// const Student = User.discriminator('Student', new Schema({
//     age: Number,
//     grade: Number,
//     teachers: [{ type: ObjectID, ref: 'Teacher' }]
// }, options));

// const Teacher = User.discriminator('Teacher', new Schema({
//     school: String,
//     subject: String
// }, options));

// const student = new Student({
//     name: "John Appleseed",
//     email: "john@gmail.com",
//     password: "123",
//     age: 18,
//     grade: 12,
//     teachers: [...]
// });

// console.log(student.kind) // Student


// Example 2:
// const options = {discriminatorKey: 'kind'};

// const userSchema = new mongoose.Schema({/* user schema */}, options);
// const User = mongoose.model('User', userSchema);

// // Schema that inherits from User
// const teacherSchema = Event.discriminator('Teacher',
//   new mongoose.Schema({/* Schema specific to teacher */}, options));
// const studentSchema = Event.discriminator('Student',
//   new mongoose.Schema({/* Schema specific to student */}, options));

// const teacher = new Teacher({/* you can add everything here! */});
// const student = new Student({/* you can add everything here! */});