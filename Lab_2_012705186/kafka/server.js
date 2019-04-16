var connection = new require('./kafka/Connection');
//topics files
var Signup = require('./services/signup');
var Login = require('./services/login');
var Course = require('./services/course');
var Courses = require('./services/courses');
var Profile = require('./services/profile');
var editProfile = require('./services/editprofile');
var courseInfo = require('./services/courseinfo');
var editcourseInfo = require('./services/editcourseinfo');
var People = require('./services/people');
var editPeople = require('./services/editpeople');
var Announcement = require('./services/announcement');
var editAnnouncement = require('./services/editannouncement');
var Assignment = require('./services/assignment');
var File = require('./services/file');
var addFile = require('./services/addfile');
var Quiz = require('./services/quiz');
var Message = require('./services/message');
var sendMessage = require('./services/sendmessage');
var addCourse = require('./services/addcourse');
var createQuiz = require('./services/createquiz');


function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", Signup)
handleTopicRequest("login1", Login)
handleTopicRequest("course", Course)
handleTopicRequest("courses", Courses)
handleTopicRequest("profile", Profile)
handleTopicRequest("editprofile", editProfile)
handleTopicRequest("courseinfo", courseInfo)
handleTopicRequest("editcourseinfo", editcourseInfo)
handleTopicRequest("people", People)
handleTopicRequest("editpeople", editPeople)
handleTopicRequest("announcement", Announcement)
handleTopicRequest("editannouncement", editAnnouncement)
handleTopicRequest("assignment", Assignment)
handleTopicRequest("file", File)
handleTopicRequest("addfile", addFile)
handleTopicRequest("quiz", Quiz)
handleTopicRequest("message", Message)
handleTopicRequest("sendmessage", sendMessage)
handleTopicRequest("addcourse", addCourse)
handleTopicRequest("createquiz", createQuiz)

