import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import EmployeeRow from '../EmployeeRow';
import EmployeeList from '../EmployeeList';
import AdminBody from '../AdminBody';
import EmployeeForm from '../EmployeeForm';
import ReviewForm from '../ReviewForm';
import ReviewRow from '../ReviewRow';
import ReviewList from '../ReviewList'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('EmployeeRow', module)
  .add('not selected', () => (
    <EmployeeRow employee={{ firstName: 'Paul', lastName: 'Salinas'}}/>
  ))
  .add('selected', () => (
    <EmployeeRow
      employee={{ firstName: 'Should be', lastName: 'Selected'}}
      selected={ true }
    />
  ))

storiesOf('EmployeeList', module)
  .add('multiple employees', () => (
    <EmployeeList
      employees={[
        { objectId: '1', firstName: 'Paul', lastName: 'Salinas'},
        { objectId: '2', firstName: 'Jeffrey', lastName: 'Macutay'},
        { objectId: '3', firstName: 'Michael', lastName: 'Ciufo'},
      ]}
      selectedId={'1'}
    />
  ))

storiesOf('AdminBody', module)
  .add('Empty', () =>(
    <AdminBody employees={[]} reviews={[]}/ >
      ))
      .add('With Clients', () => (
      <AdminBody
        employees={[
          { objectId: '1', firstName: 'Paul', lastName: 'Salinas'},
          { objectId: '2', firstName: 'Jeffrey', lastName: 'Macutay'},
          { objectId: '3', firstName: 'Michael', lastName: 'Ciufo'},
        ]}
        reviews={[
          {
            grade:'Met Expectations',
            notes:'He\'s a bad employee',
            date: new Date(2016, 10, 4),
            feedback: 'terrible review',
            employeeId: '1',
            employee: {
              firstName: 'Paul',
              lastName: 'Salinas'
            }
          },
          {
            grade:'Exceeded Expectations',
            notes:'Better!',
            date: new Date(2016, 9, 4),
            feedback: 'terrible review',
            employeeId: '1',
          employee: {
            firstName: 'Michael',
            lastName: 'Ciufo'
          }
        }
      ]}
    />
  ))

storiesOf('EmployeeForm', module)
  .add('', () => (
    <EmployeeForm/>
  ))

storiesOf('ReviewForm', module)
  .add('', () => (
    <ReviewForm/>
  ))
  .add('with default values', () => (
    <ReviewForm grade='Exceeded Expectations' notes='terrible'/>
  ))

storiesOf('ReviewRow', module)
  .add('', () => (
    <ReviewRow
      review={{
        grade:'Met Expectations',
        notes:'He\'s a bad employee',
        date: new Date(2016, 10, 4),
        feedback: 'terrible review',
        employee: {
          firstName: 'Paul',
          lastName: 'Salinas'
        }
      }}
    />
  ));

storiesOf('ReviewList', module)
  .add('', () => (
    <ReviewList
      reviews={[
        {
          grade:'Met Expectations',
          notes:'He\'s a bad employee',
          date: new Date(2016, 10, 4),
          feedback: 'terrible review',
          employee: {
            firstName: 'Paul',
            lastName: 'Salinas'
          }
        },
        {
          grade:'Exceeded Expectations',
          notes:'Better!',
          date: new Date(2016, 9, 4),
          feedback: 'terrible review',
          employee: {
            firstName: 'Michael',
            lastName: 'Ciufo'
          }
        }
      ]}
    />
  ));
