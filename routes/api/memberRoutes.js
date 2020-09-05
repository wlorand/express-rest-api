/**
 * File: memberRoutes.js
 * Desc: API routes for the members endpoints
 */
const express = require('express');
const router = express.Router();

// 3p packages
// const uuid = require('uuid');

// import mock data Model
let members = require('../../models/Members');

// ***** ROUTES / API ENDPOINTS ******

// GET all members
// - note: parent api endpoint stored in app.js, some thse route paths are relative to it: '/api/v1/members'
router.get('/', (req, res) => res.json(members));

// GET single member
router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === Number(req.params.id)));
  } else {
    // return an error status and an error msg
    res
      .status(400)
      .json({ msg: `No member found with an id of ${req.params.id}` });
  }
});

// POST to create new member -- hit it with a POST request now
router.post('/', (req, res) => {
  // res.send(req.body);  // test send back the json entered in Postman

  // 0- hack around getting an auto-increment id field locally
  const nextId = members.length + 1;

  // 1 - create a newMember object
  const newMember = {
    id: nextId,
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  // 2- verify name and email fields are present
  if (!newMember.name || !newMember.email)
    return res.status(400).json({ msg: 'please include a name and email' });

  // 3- add to the list of members
  members = [...members, newMember]; // new immutable way
  // members.push(newMember);  // old - mutates the data

  // 4- issue a response to the request (dealers choice) - obj, string, whole array
  res.json(members);
});

// Update Member PUT
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  // change code to handle error first in better node code practice
  if (found) {
    // get stuff from request body
    const updatedMember = req.body; // grab updated name and email
    // -- grab the id to know which member to update
    // loop thru them
    members.forEach((member) => {
      // check for matching id to find the one to update
      if (member.id === Number(req.params.id)) {
        member.name = updatedMember.name || member.name;
        member.email = updatedMember.email || member.email;
      }
      // send a response
      res.json({ msg: `Member with id ${member.id}`, member: member });
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member found with an id of ${req.params.id}` });
  }
});

// DELETE a Member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === Number(req.params.id));
  if (found) {
    // no body sent like POST or PUT - so no use of req.body
    res.json({
      msg: `Member Deleted`,
      members: members.filter((member) => member.id !== Number(req.params.id)),
    });
  } else {
    // return an error status and an error msg
    res
      .status(400)
      .json({ msg: `No member found with an id of ${req.params.id}` });
  }
});

module.exports = router;
