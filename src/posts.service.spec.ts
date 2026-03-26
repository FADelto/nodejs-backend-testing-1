import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // act
    const result = postsService.create(post);

    // assert
    expect(result.text).toEqual('Mocked post');
    expect(result.id).toEqual('2');
    expect(result.date).toBeDefined();
  });

  it('should find a post', () => {
    // arrange
    const created = postsService.create(post);

    // act
    const found = postsService.find(created.id);

    // assert
    expect(found).toBeDefined();
    expect(found?.id).toEqual(created.id);
    expect(found?.text).toEqual(created.text);
  });
});