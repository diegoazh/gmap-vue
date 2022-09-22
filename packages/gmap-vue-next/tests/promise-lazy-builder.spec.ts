import { beforeEach, describe, expect, test, vi } from 'vitest';

describe('promise-lazy-builder', () => {
  let promiseLazyBuilder;

  beforeEach(async () => {
    promiseLazyBuilder = await import(
      '../src/composables/promise-lazy-builder'
    );
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('should print a message when plugins options are not define', () => {
    // Arrange
    const message = '$finalOptions was not defined yet...';
    vi.spyOn(console, 'warn');

    // Act
    promiseLazyBuilder.pluginOptions();

    // Assert
    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith(message);
  });

  test('should return the options passed to the plugin when it is initialized', () => {
    // Arrange
    const optionsMock = { load: { key: 'abc' } };
    promiseLazyBuilder.saveLazyPromiseAndFinalOptions(
      optionsMock,
      () => undefined
    );

    // Act
    const result = promiseLazyBuilder.pluginOptions();

    // Assert
    expect(result).toEqual(optionsMock);
  });

  test('should save the options and the API promise lazy when its called', () => {
    // Arrange
    const optionsMock = { load: { key: 'abc' } };
    const fnMock = () => 'this is a test';

    // Act
    promiseLazyBuilder.saveLazyPromiseAndFinalOptions(optionsMock, fnMock);

    expect(promiseLazyBuilder.pluginOptions()).toEqual(optionsMock);
    expect(promiseLazyBuilder.useGmapApiPromiseLazy()).toEqual(fnMock());
  });

  test('should only save once the options and the API promise lazy when its called', () => {
    // Arrange
    const optionsMock = { load: { key: 'abc' } };
    const fnMock = () => 'this is a test';
    const optionsMock2 = { load: { key: 'def' } };
    const fnMock2 = () => 'this is a test 2';

    // Act
    promiseLazyBuilder.saveLazyPromiseAndFinalOptions(optionsMock2, fnMock2);
    promiseLazyBuilder.saveLazyPromiseAndFinalOptions(optionsMock, fnMock);

    expect(promiseLazyBuilder.pluginOptions()).toEqual(optionsMock2);
    expect(promiseLazyBuilder.useGmapApiPromiseLazy()).toEqual(fnMock2());
  });

  test('should print a message when gmapAppiPromiseLazy is not define', () => {
    // Arrange
    vi.spyOn(console, 'warn');
    const message = '$gmapApiPromiseLazy was not created yet...';

    // Act
    promiseLazyBuilder.useGmapApiPromiseLazy();

    // Assert
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(message);
  });
});
