import React, { useEffect, useState } from 'react';
import Classes from './CreateProject.module.css';
import OptionType from '../../Components/InputType/InputType';
import { Radio, Form, Checkbox, Select, Button } from 'antd';
import 'antd/lib/radio/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
import { backendUrl } from '../../shared/utility';

const CreateProject = props => {
  const [questionnaireForm, setQuestionnaireForm] = useState([]);
  const [error, setError] = useState(null);

  const inputChangeHandler = (event, questionId, date) => {
    event.preventDefault();
    let updatedQuestionnaireForm = [...questionnaireForm];
    updatedQuestionnaireForm.map(
      questions => questions.id === questionId && (questions.answer = [event.target.value])
    );
    updatedQuestionnaireForm = showOrHideQuestionOne(updatedQuestionnaireForm);
    setQuestionnaireForm(showOrHideQuestions(updatedQuestionnaireForm));
  };

  const datePickerHandler = (questionId, date, dateString) => {
    let updatedQuestionnaireForm = [...questionnaireForm];
    updatedQuestionnaireForm.map(
      questions => questions.id === questionId && (questions.answer = [dateString])
    );
    setQuestionnaireForm(updatedQuestionnaireForm);
  };

  const showOrHideQuestions = updatedQuestionnaireForm => {
    updatedQuestionnaireForm.map(question => {
      if (question.id === 17) {
        updatedQuestionnaireForm.filter(oldQuestion =>
          oldQuestion.answer.map(answer =>
            answer === 'no' && oldQuestion.id === 16
              ? (question.isShown = false) +
                (question.shouldValidate = false) +
                (question.answer = [])
              : answer === 'yes' &&
                oldQuestion.id === 16 &&
                (question.isShown = true) + (question.shouldValidate = true)
          )
        );
      }
    });

    return updatedQuestionnaireForm;
  };

  const showOrHideQuestionOne = updatedQuestionnaireForm => {
    let question1;

    updatedQuestionnaireForm.map(
      question =>
        question.id === 1 &&
        question.answer.map(answer => {
          return (question1 = answer === 'I would like to submit a new Simplify idea');
        })
    );

    !question1
      ? updatedQuestionnaireForm.map(question =>
          question.id <= 26
            ? (question.isShown = true) + (question.shouldValidate = true)
            : question.id >= 27
            ? (question.isShown = false) +
              (question.shouldValidate = false) +
              (question.answer = [])
            : null
        )
      : updatedQuestionnaireForm.map(question =>
          question.id === 1
            ? (question.isShown === true) + (question.shouldValidate === true)
            : question.id <= 26
            ? (question.isShown = false) +
              (question.shouldValidate = false) +
              (question.answer = [])
            : question.id >= 27 && (question.isShown = true) + (question.shouldValidate = true)
        );

    return updatedQuestionnaireForm;
  };

  useEffect(() => {
    const url = `${backendUrl()}/projects/questionnaire`;
    const method = 'GET';
    const header = { 'Content-Type': 'application/json' };

    fetch(url, {
      method: method,
      headers: header
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.message || 'Failed to get fetch');
        }
        return res.json();
      })
      .then(resData => {
        const data = resData.questionnaire.map(questions => {
          return {
            id: questions.id,
            question: questions.question,
            isShown: questions.id === 1,
            shouldValidate: questions.id === 1,
            optionType: questions.optionType,
            options: questions.options.map(option => option),
            answer: []
          };
        });
        setQuestionnaireForm(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onSubmitHandler = async event => {
    event.preventDefault();
    if (validateAnswers()) {
      return;
    }
    setError(null);
    const url = `${backendUrl()}/projects/createProject`;
    const method = 'POST';
    const header = { 'Content-Type': 'application/json' };

    const questions = questionnaireForm.map(questions => {
      return {
        id: questions.id,
        question: questions.question,
        answers: questions.answer
      };
    });

    const projectTitle = getQuestionAnswer(28, questions);
    const projectType =
      getQuestionAnswer(1, questions) === 'I would like to submit a new Simplify idea'
        ? 'Simplify'
        : 'New Change';
    const newProject = {
      name: projectTitle || `project ${Math.round(Math.random() * (10000 - 1 + 1) + 1)}`,
      projectType: projectType,
      projectSize: projectType !== 'Simplify' ? 'Large' : '',
      questions: questions
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: header,
        body: JSON.stringify({
          newProject: newProject
        })
      });
      const resData = await response.json();
      props.history.push('/create-project/success');
      if (!response.ok) {
        throw new Error(response.message || 'Failed to post data');
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionAnswer = (questionId, questions) => {
    let currentAnswer;
    questions.find(
      question =>
        question.id === questionId &&
        question.answers.map(answer => {
          return (currentAnswer = answer);
        })
    );
    return currentAnswer;
  };

  const validateAnswers = () => {
    let currentError = false;
    questionnaireForm.filter(
      question =>
        question.shouldValidate &&
        question.answer.length === 0 &&
        question.id !== 2 &&
        setError(
          'Please ensure all the necessary questions marked with an asterisk (*) are answered'
        ) + (currentError = true)
    );
    return currentError;
  };

  const optionTypeHandler = (question, option) => {
    let optionType = null;
    switch (option) {
      case 'multi-option':
        optionType = (
          <Radio.Group>
            {question.options.map((answerOption, index) => (
              <OptionType
                onChange={event => inputChangeHandler(event, question.id)}
                inputType={question.optionType}
                key={index}
                answerOption={answerOption}
              />
            ))}
            {question.options.map(
              answerOption =>
                answerOption === 'other' && (
                  <OptionType
                    onChange={event => inputChangeHandler(event, question.id)}
                    inputType="input"
                    key={question.id}
                  />
                )
            )}
          </Radio.Group>
        );
        return optionType;
      case 'textArea':
        optionType = (
          <OptionType
            onChange={event => inputChangeHandler(event, question.id)}
            inputType={question.optionType}
          />
        );
        return optionType;
      case 'multi-checkbox':
        optionType = (
          <Checkbox.Group>
            {question.options.map((answerOption, index) => (
              <OptionType
                onChange={event => inputChangeHandler(event, question.id)}
                inputType={question.optionType}
                key={index}
                answerOption={answerOption}
              />
            ))}
          </Checkbox.Group>
        );
        return optionType;
      case 'date':
        optionType = (
          <OptionType
            onChange={(date, dateString) => datePickerHandler(question.id, date, dateString)}
            inputType={question.optionType}
          />
        );
        return optionType;
      case 'input':
        optionType = (
          <OptionType
            onChange={event => inputChangeHandler(event, question.id)}
            inputType={question.optionType}
          />
        );
        return optionType;
      case 'y/n':
        optionType = (
          <Radio.Group>
            <OptionType
              onChange={event => inputChangeHandler(event, question.id)}
              inputType={question.optionType}
            />
          </Radio.Group>
        );
        return optionType;
      case 'dropdown':
        optionType = (
          <Select defaultValue="" style={{ minWidth: '300px' }} onChange="">
            {question.options.map((answerOption, index) => (
              <OptionType inputType={question.optionType} key={index} answerOption={answerOption} />
            ))}
          </Select>
        );
        return optionType;
      case 'number':
        optionType = (
          <OptionType
            onChange={event => inputChangeHandler(event, question.id)}
            inputType={question.optionType}
          />
        );
        return optionType;
      default:
        return optionType;
    }
  };

  return (
    <>
      <div className={Classes.CreateProject}>
        <h3 style={{ display: 'inline-block', width: '40rem' }}>
          This is a form to submit any ideas you may have not all parts of the form need to be
          filled out
        </h3>
        {error && (
          <h4
            style={{
              border: '1px solid #a33a3a',
              width: '40rem',
              display: 'inline-block',
              background: '#ffe0e0',
              color: '#ba3939'
            }}
          >
            {error}
          </h4>
        )}
        <Form>
          {questionnaireForm.map(
            question =>
              question.isShown === true && (
                <div className={Classes.Box} key={question.id}>
                  <h2>{question.question}</h2>
                  {optionTypeHandler(question, question.optionType)}
                </div>
              )
          )}
        </Form>
        <Button
          style={{ background: 'green', borderColor: 'none' }}
          color="green"
          type="primary"
          className={Classes.Button}
          onClick={event =>
            onSubmitHandler(event) + window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          Submit
        </Button>
        <br></br>
      </div>
    </>
  );
};
export default CreateProject;
