from datetime import datetime


def create_question(question):

    return {

        "test_name": question.test_name,

        "question": question.question,

        "option1": question.option1,
        "option2": question.option2,
        "option3": question.option3,
        "option4": question.option4,

        "correct_answer": question.correct_answer,

        "marks": question.marks,

        "created_at": datetime.utcnow()

    }