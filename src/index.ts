import { v4 as uuidV4 } from 'uuid';

type Goal = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');

const form =
  (document.getElementById('new-goal-form') as HTMLFormElement) || null;

const input = document.querySelector<HTMLInputElement>('#new-goal-title');

const goals: Goal[] = loadGoals();
goals.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newGoal: Goal = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  goals.push(newGoal);

  addListItem(newGoal);
  input.value = '';
});

function addListItem(goal: Goal) {
  const item = document.createElement('li');

  const label = document.createElement('label');

  const checkbox = document.createElement('input');

  checkbox.addEventListener('change', () => {
    goal.completed = checkbox.checked;

    saveGoals();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = goal.completed;

  label.append(checkbox, goal.title);

  item.append(label);

  list?.append(item);
}

function saveGoals() {
  localStorage.setItem('GOALS', JSON.stringify(goals));
}

function loadGoals(): Goal[] {
  const goalsJSON = localStorage.getItem('GOALS');
  if (goalsJSON == null) {
    return [];
  }

  return JSON.parse(goalsJSON);
}
