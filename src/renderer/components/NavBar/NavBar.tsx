import React from 'react';
import { NavLink } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="space-x-3">
      <ul>
        <li>
          <NavLink to={'randomizer'} className="">
            Randomizer
          </NavLink>
        </li>
        <li>
          <NavLink to={'quiz'} className="">
            Quiz
          </NavLink>
        </li>
        <li>
          <NavLink to={'quiz/create'} className="">
            Create Quiz
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
