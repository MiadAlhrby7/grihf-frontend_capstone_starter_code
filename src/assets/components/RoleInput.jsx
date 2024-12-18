import React from 'react';
import '../pages/SignUp/SignUp.css';

const RoleSelection = ({ role, handleRoleChange }) => {

  return (
    <div>
      <h2>Select Your Role</h2>

      <label>
        <input
          type="radio"
          value="patient"
          checked={role === 'patient'}
          onChange={handleRoleChange}
        />
        Patient
      </label>

      <label>
        <input
          type="radio"
          value="medic"
          checked={role === 'medic'}
          onChange={handleRoleChange}
        />
        Medic
      </label>

      <p>Selected Role: {role ? role : "None"}</p>
    </div>
  );
};

export default RoleSelection;
