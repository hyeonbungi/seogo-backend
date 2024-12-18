import { Prisma } from '@prisma/client';

// 문자열 T에서 접미사 "ScalarFieldEnum"을 제거하고, 제거된 결과를 반환한다.
type S<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
// Prisma 객체에서 유효한 키를 확인하고,
// "ScalarFieldEnum" 접미사가 붙은 키를 추출합니다.
type Entity = S<keyof typeof Prisma>;
// 엔터티의 모든 스칼라 필드 이름을 추출한다.
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function excludePrismaScalarFields<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;

  const result: TMap = {} as TMap;

  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }

  return result;
}
