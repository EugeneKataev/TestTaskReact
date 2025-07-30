# Blog App

## Описание

Blog App - это простое приложение для ведения блога, разработанное с использованием React, Next.js и Firebase. Приложение позволяет пользователям создавать, просматривать, редактировать и удалять посты, а также оставлять комментарии к ним.

## Технологии

- **Frontend**: React 19, Next.js 15
- **Управление состоянием**: Redux, Redux Toolkit
- **База данных**: Firebase Firestore
- **Валидация**: Zod
- **Типизация**: TypeScript

## Функциональность

- Просмотр списка постов
- Создание новых постов
- Редактирование существующих постов
- Удаление постов
- Добавление комментариев к постам
- Просмотр комментариев

## API

### Посты

#### Структура данных поста

```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Получение списка постов

```typescript
// Получение всех постов, отсортированных по дате создания (по убыванию)
const q = query(postsCollection, orderBy('createdAt', 'desc'));
const querySnapshot = await getDocs(q);
```

#### Получение поста по ID

```typescript
const docRef = doc(postsCollection, postId);
const docSnap = await getDoc(docRef);
```

#### Создание поста

```typescript
const newPost: CreatePostDocument = {
  title: postData.title,
  content: postData.content,
  author: postData.author,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};
const docRef = await addDoc(postsCollection, newPost);
```

#### Обновление поста

```typescript
const updateData: UpdatePostDocument = {
  title: postData.title,
  content: postData.content,
  author: postData.author,
  updatedAt: serverTimestamp()
};
const docRef = doc(postsCollection, postId);
await updateDoc(docRef, updateData);
```

#### Удаление поста

```typescript
const docRef = doc(postsCollection, postId);
await deleteDoc(docRef);
```

### Комментарии

#### Структура данных комментария

```typescript
interface Comment {
  id: string;
  postId: string;
  text: string;
  author: string;
  createdAt: Date;
}
```

#### Получение комментариев к посту

```typescript
// Получаем комментарии без сортировки в запросе (чтобы избежать составного индекса)
const q = query(
  commentsCollection,
  where('postId', '==', postId)
);
const querySnapshot = await getDocs(q);

// Сортируем на клиенте
const comments = [];
querySnapshot.forEach((doc) => {
  comments.push(convertCommentFromFirestore(doc.id, doc.data()));
});
comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
```

#### Создание комментария

```typescript
const newComment = {
  postId,
  text: commentData.text,
  author: commentData.author,
  createdAt: serverTimestamp()
};
const docRef = await addDoc(commentsCollection, newComment);
```

#### Удаление комментариев поста

```typescript
const q = query(commentsCollection, where('postId', '==', postId));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(async (document) => {
  await deleteDoc(doc(commentsCollection, document.id));
});
```

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск собранного проекта
npm run start
```

## Валидация данных

Приложение использует библиотеку Zod для валидации данных форм:

```typescript
// Валидация поста
const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});

// Валидация комментария
const CommentSchema = z.object({
  text: z.string().min(1, "Comment text is required").max(500, "Comment is too long"),
  author: z.string().min(1, "Author name is required").max(100, "Author name is too long")
});
```