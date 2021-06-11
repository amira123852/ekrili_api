const { getToken, comparePassword } = require("../helpers/auth.helpers");
const ROLES = require("../helpers/user-validation").roles;
const Contact = require('../db/models/contact-schema');

const register = (User) => async (u) => {
  const user = new User(u);
  try {
    const save = await user.save();
    if (save) {
      return {
        status: "success",
        message: "user registred succssfully!!!",
        payload: save,
      };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "User failed to register!!!",
      payload: error,
    };
  }
};

const authenticate = (User) => async (email, password) => {
  if (!email && !password) {
    return {
      status: "fail",
      message: "can't authenticate without credential",
      payload: null,
    };
  }

  try {
    const user = await User.findOne({  email: email });
    if (comparePassword(password, user.password)) {
      const token = getToken(user);
      return { status: "success",  message: "user authenticated succssfully!!!",
       payload: {
          user: user.toJSON(),
          token: token,
        },
      };
    } else {
      return {
        status: "error",
        message: "Invalid email or password!!!",
        payload: null,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "user can't authenticate",
      payload: error,
    };
  }
};

const getAllUser = (User) => async () => {
  try {
    let users = await User.find({}).populate("customer");
    if (users) {
      return {
        status: "success",
        message: "all users",
        payload: users,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "error to get users",
      payload: null,
    };
  }
};


  

const updateUser = (User) => async (id, user) => {
  if (user === undefined || JSON.stringify(user) === "{}") {
    return {
      status: "error",
      message: "You should send fullusername,phone and city",
      payload: null,
    };
  }
  try {
    let updatedUser = await User.findByIdAndUpdate(id, user);
    if (updatedUser) {
      return {
        status: "success",
        message: "User updated successfully",
        payload: await User.findById(id),
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "update user is failed",
      payload: error,
    };
  }
};


    
 

const deleteUser = (User) => async (id) => {
  if (id === undefined) {
    return {
      status: "error",
      message: `Can't delete user without a given id`,
      payload: null,
    };
  }
  try {
    let user = await User.deleteOne({ _id: id });
    if (user) {
      return {
        status: "success",
        message: `User with _id=${id} has deleted`,
        payload: user,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: `Error to delete user with _id=${id}`,
      payload: null,
    };
  }
};
const contactus = (Contact) => async (contact) => {
  const _contact = new Contact(contact);

  try {
    
    const save= await _contact.save();

    if (save) {
      return {
        status: "success",
        message: "Contact succssfully!!!",
        payload: save,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "failed",
      message: "failed!!!",
      payload: error,
    };
  }
};


const ContactList = (Contact) => async () => {
  try {
    let contacts = await Contact.find({}).populate("customer");
    if (contacts) {
      return {
        status: "success",
        message: "all messages",
        payload: contacts,
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "error to get messages",
      payload: null,
    };
  }
};
module.exports = (User) => {
  return {
    register: register(User),
    authenticate: authenticate(User),
    getAllUsers: getAllUser(User),
 //   getUserById: getUserById(User),
    updateUser: updateUser(User),
   // updateUserRole: updateUserRole(User),
    deleteUser: deleteUser(User),
   contactus: contactus(Contact),
  ContactList: ContactList(Contact)

  };
};
