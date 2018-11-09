[![npm](https://img.shields.io/npm/v/cancellation-token-source.svg?style=flat-square)](https://www.npmjs.com/package/cancellation-token-source)
[![Travis (.org)](https://img.shields.io/travis/Xapphire13/cancellationTokenSource.js.svg?style=flat-square)](https://travis-ci.org/Xapphire13/cancellationTokenSource.js)

# cancellationTokenSource.js
CancellationTokenSource implementation for JavaScript based on the
[C# implementation of the same name](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtokensource)

## Installation
```
npm install cancellation-token-source
```

## Usage
```javascript
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
