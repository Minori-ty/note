```
npm i jest vue-jest babel-jest @babel/preset-env @vue/test-utils -D 
```

babel.config.js

```
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
    ],
}
```

jest.config.js

```
module.exports = {
	testEnvironment: 'jsdom',
	transform:{
		"^.+\\.vue$":"vue-jest",
		"^.+\\js$":"babel-jest"
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'vue'],
	testMatch:["**/__tests__/**/*.spec.js", "**/tests/**/*.spec.js"],
	moduleNameMapper:{
		"^main(.*)$":"<rootDir>/src$1"
	}
}
```

```
"test":"jest --runInBand"
```

