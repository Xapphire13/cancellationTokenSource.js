[![npm](https://img.shields.io/npm/v/cancellation-token-source.svg?style=flat-square)](https://www.npmjs.com/package/cancellation-token-source)

# cancellationTokenSource.js
CancellationTokenSource implementation for JavaScript based on the
[C# implementation of the same name](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource)

## Installation
```
npm install cancellation-token-source
```

## Usage
```JavaScript
import {CancellationTokenSource} from "cancellation-token-source";

async function myAsyncFunc(cancellationToken: CancellationToken): Promise<void> {
  const result = await someOtherThing();
  cancellationToken.throwIfCancellationRequested();

  // Perform things we don't want to happen when canceled
}

const cts = new CancellationTokenSource();
myAsyncFunc(cts.token);
```

## API
See the [API docs](https://xapphire13.github.io/cancellationTokenSource.js)
