

// This function is called by the submit button in testtrakker.html when user creates an item in the form
      addStudent: function(studentName, extendTime, testOneName, testOneTimeObj, testTwoName, testTwoTimeObj, testThreeName, testThreeTimeObj, testFourName, testFourTimeObj) {

        if (typeof testOneName === "undefined") {
          testOneName = '';
        }
        if (typeof testTwoName === "undefined") {
          testTwoName = '';
        }
        if (typeof testThreeName === "undefined") {
          testThreeName = '';
        }
        if (typeof testFourName === "undefined") {
          testFourName = '';
        }

        if (typeof testOneTimeObj === "undefined") {
          testOneTimeNum = 18000000;
          totalTimeOne = 0;
        } else if (testOneTimeObj) {
          testOneTimeNum = addHoursAndMinutes(testOneTimeObj.getHours(), testOneTimeObj.getMinutes());
          totalTimeOne = testOneTimeNum * extendTime;
        }
        if (typeof testTwoTimeObj === "undefined") {
          testTwoTimeNum = 18000000;
          totalTimeTwo = 0;
        } else if (testTwoTimeObj) {
          testTwoTimeNum = addHoursAndMinutes(testTwoTimeObj.getHours(), testTwoTimeObj.getMinutes());
          totalTimeTwo = testTwoTimeNum * extendTime;
        }
        if (typeof testThreeTimeObj === "undefined") {
          testThreeTimeNum = 18000000;
          totalTimeThree = 0;
        } else if (testThreeTimeObj) {
          testThreeTimeNum = addHoursAndMinutes(testThreeTimeObj.getHours(), testThreeTimeObj.getMinutes());
          totalTimeThree = testThreeTimeNum * extendTime;
        }
        if (typeof testFourTimeObj === "undefined") {
          testFourTimeNum = 18000000;
          totalTimeFour = 0;
        } else if (testFourTimeObj) {
          testFourTimeNum = addHoursAndMinutes(testFourTimeObj.getHours(), testFourTimeObj.getMinutes());
          totalTimeFour = testFourTimeNum * extendTime;
        }

        auth.onAuthStateChanged(user => {
          if (user) {
            var currentUser = auth.currentUser;
            console.log("onAuthStateChanged hit!!!!");
            var uid = currentUser.uid
            const studentsRef = firebase.database().ref('users/' + uid).child("students");
            const students = $firebaseArray(studentsRef);

            students.$add({
              name: studentName,
              extendTime: extendTime,
              testOneName: testOneName,
              testOneTime:  testOneTimeNum || 18000000,
              totalTimeOne: testOneTimeNum * extendTime,
              testOneStartRecord: 0,
              testOneStartTime: 0,
              isTimerOneStart: false,
              isTimerOnePaused: false,
              pausedTimeOne: 0,
              pausedTotalOne: 0,
              isTestOneOver: false,
              testOneEndedAt: 0,
              testTwoName: testTwoName,
              testTwoTime: testTwoTimeNum || 18000000,
              totalTimeTwo: testTwoTimeNum * extendTime,
              testTwoStartRecord: 0,
              testTwoStartTime: 0,
              isTimerTwoStart: false,
              isTimerTwoPaused: false,
              pausedTimeTwo: 0,
              pausedTotalTwo: 0,
              isTestTwoOver: false,
              testTwoEndedAt: 0,
              testThreeName: testThreeName,
              testThreeTime: testThreeTimeNum || 18000000,
              totalTimeThree: testThreeTimeNum * extendTime,
              testThreeStartRecord: 0,
              testThreeStartTime: 0,
              isTimerThreeStart: false,
              isTimerThreePaused: false,
              pausedTimeThree: 0,
              pausedTotalThree: 0,
              isTestThreeOver: false,
              testThreeEndedAt: 0,
              testFourName: testFourName,
              testFourTime: testFourTimeNum || 18000000,
              totalTimeFour: testFourTimeNum * extendTime,
              testFourStartRecord: 0,
              testFourStartTime: 0,
              isTimerFourStart: false,
              isTimerFourPaused: false,
              pausedTimeFour: 0,
              pausedTotalFour: 0,
              isTestFourOver: false,
              testFourEndedAt: 0,
              isSafeToDelete: false,
              created_at: firebase.database.ServerValue.TIMESTAMP
            }).then(function(studentsRef) {
              var id = studentsRef.key;
              console.log(studentName + ": end.  Added student with id " + id);
              students.$indexFor(id);
            });
          } else {
            console.log("AuthStateChange failed");
          }
        });
      }// end of AddItem

    }; // end of Return

  } // end of StudentCrud function
]); // end of factory initialization
