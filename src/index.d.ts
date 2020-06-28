interface Application {
  /**
   * Executes a command in the command line tool of the operating system.
   */
  system(command: string): void
}
declare let app: Application
type Layer = ArtLayer | LayerSet

/*** cross-DOM communication ***/

/**
 * All forms of interapplication communication use Application specifiers to
 * identify Adobe applications. Application specifiers are strings that encode
 * the application name, a version number and a language code. They take the
 * following form:
 * appname[_instance[[-version[-locale]]]
 */
declare const acrobat: crossDOM
declare const aftereffects: crossDOM
declare const bridge: crossDOM
declare const estoolkit: crossDOM
declare const illustrator: crossDOM
declare const incopy: crossDOM
declare const indesign: crossDOM
declare const indesignserver: crossDOM
declare const photoshop: crossDOM
declare const premiere: crossDOM

interface crossDOM {
  /**
   * Performs a JavaScript eval on the specified script. The entire document
   * object model (DOM) of the target application is available to the script.
   * Returns undefined.
   * @param script A string containing the script to be evaluated.
   */
  executeScript(script: string): void

  /**
   * Performs the equivalent of the target application’s File > Open command
   * on the specified files. Returns undefined.
   * @param files A File object or array of File objects. For applications
   * that use compound documents, this should be a project file.
   */
  open(files: File | File[]): void

  /**
   * Performs the equivalent of the target application’s File > New command.
   * Returns true on success. Options argument depends on target application.
   * Adobe Bridge: none
   * Photoshop: none
   * InDesign: creation options are:
   * (Boolean:showingWindow, ObjectOrString:documentPresets)
   * See the arguments for documents.add() in the Adobe InDesign CS5
   * Scripting Reference.
   * Illustrator: creation options are:
   * ([DocumentColorSpace:colorspace][, Number:width, Number:height])
   * See the arguments for documents.add() in the Adobe Illustrator CS5
   * JavaScript Reference.
   */
  openAsNew(): void
  openAsNew(showingWindow?: boolean, documentPresets?: any): void
  openAsNew(colorSpace?: any, width?: number, height?: number): void

  /**
   * Performs the equivalent of the target application’s File > Print command
   * on the specified files. Returns undefined.
   * @param files A File object or array of File objects. For applications
   * that use compound documents, this should be a project file.
   */
  print(files: File | File[]): void

  /**
   * Performs the equivalent of the target application’s File > Exit or
   * File > Close command. Returns undefined. NOTE: This function is
   * available for Adobe Acrobat®, but does nothing. Scripts cannot terminate
   * the application.
   */
  quit(): void

  /**
   * Gives the target application the operating-system focus, and, if the
   * specified file is open in that application, brings it to the foreground.
   * Returns undefined.
   * @param files A File object or string specifying a file that can be
   * opened in the target application.
   */
  reveal(files: File | string): void
}

/*** BridgeTalk ***/

/**
 * Static properties and methods of this class provide a way for your script to
 * determine basic messaging system information before you create any specific
 * message objects. Static methods allow you to check if an application is
 * installed and is already running, and to launch the application. A callback
 * defined on the class determines how the application processes incoming
 * messages. You can access static properties and methods in the
 * BridgeTalkclass, which is available in the global namespace. For example:
 * var thisApp = BridgeTalk.appName;
 * NOTE: You must instantiate the BridgeTalk class to create the BridgeTalk
 * message object, which is used to send message packets between applications.
 * Dynamic properties and methods can be accessed only in instances.
 */
interface BridgeTalk {
  /**
   * The instance identifier of an application launched by the messaging
   * framework, the instance portion of an application specifier; Read only.
   * Used only for those applications, such as InDesign, that support
   * launching and running multiple instances.
   */
  readonly appInstance: string

  /**
   * The locale of this application, the locale portion of an application
   * specifier; When a message is sent, this is the locale of the sending
   * application. Read only.
   */
  readonly appLocale: string

  /**
   * The name of this application, the appname portion of an application
   * specifier; When a message is sent, this is the name of the sending
   * application. Read only.
   */
  readonly appName: string

  /**
   * A lower-case string containing the complete specifier for this
   * application; Read/write.
   */
  appSpecifier: string

  /**
   * The current processing status of this application. Read only. One of:
   * busy — The application is currently busy, but not processing messages.
   * This is the case, for example, when a modal dialog is shown.
   * idle — The application is currently idle, but processes messages
   * regularly.
   * not installed — The application is not installed.
   */
  appStatus: 'busy' | 'idle' | 'not installed'

  /**
   * The version number of this application, the version portion of an
   * application specifier; When a message is sent, this is the version of
   * the sending application. Read only.
   */
  readonly appVersion: string

  /**
   * A callback function that this application applies to unsolicited
   * incoming messages. The default function evaluates the body of the
   * received message and returns the result of evaluation. To change the
   * default behavior, set this to a function definition in the following
   * form:
   * BridgeTalk.onReceive = function( bridgeTalkObject ) {
   * // act on received message
   * };
   * The body property of the received message object contains the received
   * data. The function can return any type.
   */
  onReceive: Function

  /**
   * A specifier for the target application; Brings all windows of the
   * specified application to the front of the screen. In Mac OS, an
   * application can be running but have no windows open. In this case,
   * calling this function might or might not open a new window, depending
   * on the application. For Adobe Bridge, it opens a new browser window.
   * Possible app specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   */
  bringToFront(app: string): void

  /**
   * A specifier for the target application; Retrieves the full path of the
   * executable file for a specified application. Returns a string. Possible
   * app specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   */
  getAppPath(app: string): string

  /**
   * A specifier for the target application; Returns a localized display name
   * for an application, or NULL if the application is not installed. For
   * example:
   * BridgeTalk.getDisplayName("photoshop-10.0");
   * => Adobe Photoshop CS4
   * Possible app specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   */
  getDisplayName(app: string): string

  /**
   * Retrieves a complete application specifier. Returns a complete specifier
   * for a messaging-enabled application version installed on this computer,
   * or null if the requested version of the application is not installed.
   * @param appName The base name of the application to search for. Possible
   * app specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   * @param version Optional. The specific version number to search for. If 0
   * or not supplied, returns the most recent version. If negative, returns
   * the highest version up to and including the absolute value. If a major
   * version is specified, returns the highest minor-version variation.
   * @param locale Optional. The specific locale to search for. If not
   * supplied and multiple language versions are installed, prefers the
   * version for the current locale.
   */
  getSpecifier(appName: string, version?: number, locale?: string): string

  /**
   * Optional, a specifier for the target application; If not supplied,
   * returns the processing status of the current application.
   */
  getStatus(targetSpec?: string): string

  /**
   * Retrieves a list of messaging-enabled applications installed on this
   * computer. Returns an array of Application specifiers.
   */
  getTargets(version?: number | null, locale?: string): string[]

  /**
   * Returns true if the given application is running and active on the local
   * computer. Specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   */
  isRunning(specifier: string): boolean

  /**
   * Launches the given application on the local computer. It is not
   * necessary to launch an application explicitly in order to send it a
   * message; sending a message to an application that is not running
   * automatically launches it. Returns true if the application has already
   * been launched, false if it was launched by this call. Specifiers:
   * aftereffects, bridge, estoolkit, illustrator, incopy, indesign,
   * indesignserver, photoshop
   * @param where Optional. If the value "background" is specified, the
   * application’s main window
   * is not brought to the front of the screen.
   */
  launch(specifier: string, where?: string): boolean

  /**
   * Loads the startup script for an application from the common
   * StartupScripts folders. Use to implement late loading of startup
   * scripts. Returns true if the script was successfully loaded.
   */
  loadAppScript(specifier: string): boolean

  /**
   * Sends a message to another application to determine whether it can be
   * contacted. Returns a string whose meaning is defined by the ping-request
   * key.
   */
  ping(specifier: string, pingRequest: string): string

  /**
   * Checks all active messaging interfaces for outgoing and incoming
   * messages, and processes them if there are any. Returns true if any
   * messages have been processed, false otherwise. (Most applications
   * have a message processing loop that continually checks the message
   * queues, so use of this method is rarely required.)
   */
  pump(): boolean
}

declare const BridgeTalk: {
  /**
   * constructor
   */
  new (): BridgeTalk

  /**
   * The data payload of the message. Read/write.
   */
  body: string

  /**
   * A JavaScript object containing script-defined headers. Read/write. Use
   * this property to define custom header data to send supplementary
   * information between applications. You can add any number of new headers.
   * The headers are name/value pairs, and can be accessed with the JavaScript
   * dot notation (msgObj.headers.propName), or bracket notation
   * (msgObj.headers[propName]). If the header name conforms to JavaScript
   * symbol syntax, use the dot notation. If not, use the bracket notation.
   */
  headers: any

  /**
   * The application specifier for the sending application. Read/write.
   */
  sender: string

  /**
   * The application specifier for the target, or receiving, application.
   * Read/write.
   */
  target: string

  /**
   * The number of seconds before the message times out. Read/write. If a
   * message has not been removed from the input queue for processing before
   * this time elapses, the message is discarded. If the sender has defined
   * an onTimeout callback for the message, the target application sends a
   * time-out message back to the sender.
   */
  timeout: number

  /**
   * The message type, which indicates what type of data the body contains.
   * Read/write.
   * Default is ExtendScript. You can define a type for script-defined data.
   * If you do so, the target application must have a static BridgeTalk
   * onReceive method that checks for and processes that type.
   */
  type: string

  /**
   * A callback function that the target application invokes to return an
   * error response to the sender. It can send JavaScript run-time errors or
   * exceptions, or C++ exceptions. To define error-response
   * behavior, set this to a function definition in the following form:
   * bridgeTalkObj.onError = function( errorMsgObject ) {
   * // error handler defined here
   * };
   */
  onError: Function

  /**
   * A callback function that the target application invokes to confirm that
   * the message was received. (Note that this is different from the static
   * onReceive method of the BridgeTalk class that handles unsolicited
   * messages.) To define a response to receipt notification, set this to a
   * function definition in the following form:
   * bridgeTalkObj.onReceived = function( origMsgObject ) {
   * // handler defined here
   * };
   */
  onReceived: Function

  /**
   * A callback function that the target application invokes to return a
   * response to the sender. This can be an intermediate response or the
   * final result of processing the message. To handle the response, set this
   * to a function definition in the following form:
   * bridgeTalkObj.onResult = function( responseMsgObject ) {
   * // handler defined here
   * };
   */
  onResult: Function

  /**
   * A callback function that the target application invokes with a time-out
   * message if time-out occurred before the target finished processing
   * another message previously sent by this application. To enable this
   * callback, the message must specify a value for the timeout property. To
   * define a response to the timeout event, set this to a function
   * definition in the following form:
   * bridgeTalkObj.onTimeout = function( timeoutMsgObject ) {
   * // handler defined here
   * };
   */
  onTimeout: Function

  /**
   * Sends this message to the target application. Returns true if the
   * message could be sent immediately, false if it could not be sent or was
   * queued for sending later. If the target application is not running and
   * the message contains a body, the messaging system automatically launches
   * the target application, passing in any supplied launch parameters. In
   * this case, the message is queued rather than sent immediately, and this
   * method returns false. The message is processed once the application
   * is running.
   */
  send(timeoutInSecs?: number, launchParameters?: string): boolean

  /**
   * When processing an unsolicited message, the static BridgeTalk onReceive
   * method can return an intermediate result to the sender by calling this
   * method in the received message object. It invokes the onResult callback
   * of the original message, passing a new message object containing the
   * specified result value. This allows you to send multiple responses to
   * messages. Returns true if the received message has an onResult callback
   * defined and the response message can be sent, false otherwise.
   */
  sendResult(result: any): boolean
}

/*** Socket ***/

/**
 * ExtendScript offers tools for communicating with other computers or the
 * Internet using standard protocols. The Socket object supports low-level TCP
 * connections.
 */
interface Socket {
  /**
   * When true, the connection is active. Read only.
   */
  readonly connected: boolean

  /**
   * Sets or retrieves the name of the encoding used to transmit data. Typical
   * values are "ASCII", "BINARY", or "UTF-8".
   */
  encoding: string

  /**
   * When true, the receive buffer is empty. Read only.
   */
  readonly eof: boolean

  /**
   * A message describing the most recent error. Setting this value clears
   * any error message.
   */
  error: string

  /**
   * The name of the remote computer when a connection is established. If the
   * connection is shut down or does not exist, the property contains the
   * empty string. Read only.
   */
  readonly host: string

  /**
   * The timeout in seconds to be applied to read or write operations.
   * Default is 10.
   */
  timeout: number

  /**
   * Instructs the object to start listening for an incoming connection. The
   * call to open() and the call to listen() are mutually exclusive. Call one
   * function or the other, not both. Returns true on success.
   */
  listen(port: number, encoding?: string): boolean

  /**
   * Opens the connection for subsequent read/write operations. The call to
   * open() and the call to listen() are mutually exclusive. Call one
   * function or the other, not both. Returns true on success.
   */
  open(host: string, encoding?: string): boolean

  /**
   * Checks a listening object for a new incoming connection. If a connection
   * request was detected, the method returns a new Socket object that wraps
   * the new connection. Use this connection object to communicate with the
   * remote computer. After use, close the connection and delete the
   * JavaScript object. If no new connection request was detected, the method
   * returns null. Returns a Socket object or null.
   */
  poll(): Socket | null

  /**
   * Reads up to the specified number of characters from the connection,
   * waiting if necessary. Ignores CR characters unless encoding is set to
   * BINARY. Returns a string that contains up to the number of characters
   * that were supposed to be read, or the number of characters read before
   * the connection closed or timed out.
   */
  read(count?: number): string

  /**
   * Reads one line of text up to the next line feed. Line feeds are
   * recognized as LF or CRLF pairs. CR characters are ignored. Returns a
   * string.
   */
  readln(): string

  /**
   * Concatenates all arguments into a single string and writes that string
   * to the connection. CRLF sequences are converted to LFs unless encoding
   * is set to BINARY. Returns true on success.
   */
  write(text: string, ...args: string[]): boolean

  /**
   * Concatenates all arguments into a single string, appends a Line Feed
   * character, and writes that string to the connection. Returns true on
   * success.
   */
  writeln(text: string, ...args: string[]): boolean
}

declare const Socket: {
  /**
   * constructor
   */
  new (): Socket
}

declare class $ {
  /**
   * The Internet name of the application’s default character encoding, such
   * as “CP1252” or “X-SHIFT-JIS”. Valid values are implementation- and
   * OS-dependent.
   *
   * Set to change the default encoding for the application. The returned
   * value can differ from the value set. In Windows, for example, if set to
   * “x-latin1”, the returned value is the synonymous “ISO-8859-1”.
   */
  static appEncoding: string

  /**
   * The version information for the current ExtendScript build. Read only.
   */
  static readonly build: string

  /**
   * The date the current JavaScript engine was built. Read only.
   */
  static readonly buildDate: Date

  /**
   * The character used in formatted numeric output for a decimal point, for
   * the current locale. Read only.
   */
  static readonly decimalPoint: string

  /**
   * The name of the current JavaScript engine, if set. Read only.
   */
  static readonly engineName: string

  /**
   * The most recent run-time error information, contained in a JavaScript
   * Error object.
   */
  static error: Error

  /**
   * The file name of the current script. Read only.
   */
  static readonly fileName: string

  /**
   * Gets or sets low-level debug output flags. A logical AND of the following
   * bit flag values:
   * 0x0002 (2): Displays each line with its line number as it is executed.
   * 0x0040 (64): Enables excessive garbage collection. Usually, garbage
   * collection starts when the number of objects has increased by a certain
   * amount since the last garbage collection. This flag causes ExtendScript
   * to garbage collect after almost every statement. This impairs performance
   * severely, but is useful when you suspect that an object gets released too
   * soon.
   * 0x0080 (128): Displays all calls with their arguments and the return
   * value.
   * 0x0100 (256): Enables extended error handling (see strict).
   * 0x0200 (512): Enables the localization feature of the toString method.
   * Equivalent to the localize property.
   *
   * NOTE: Other bit values are not public and should not be used.
   */
  static flags: number

  /**
   * A high-resolution timer that measures the number of microseconds since
   * this property was last accessed. Value is initialized as early as
   * possible, so the first access returns the startup time for ExtendScript.
   * The property is thread-local; that is, the first access on a thread
   * returns the time needed to create and initialize that thread. Read only.
   */
  static readonly hiresTimer: number

  /**
   * The path for include files for the current script. Read only.
   */
  static readonly includePath: string

  /**
   * The current debugging level, which enables or disables the JavaScript
   * debugger. Read only. One of:
   * 0: No debugging
   * 1: Break on runtime errors
   * 2: Full debug mode
   */
  static readonly level: number

  /**
   * The current line of the currently executing script; the first line is
   * number 1. Read only.
   */
  static readonly line: number

  /**
   * Gets or sets the current locale. The string contains five characters in
   * the form LL_RR, where LL is an ISO 639 language specifier, and RR is an
   * ISO 3166 region specifier.
   * Initially, this is the value that the application or the platform returns
   * for the current user. You can set it to temporarily change the locale for
   * testing. To return to the application or platform setting, set to
   * undefined, null, or the empty string.
   */
  static locale: string

  /**
   * Enable or disable the extended localization features of the built-in
   * toString method. See Localizing ExtendScript strings.
   */
  static localize: boolean

  /**
   * Gets or sets the ExtendScript memory cache size in bytes.
   */
  static memCache: number

  /**
   * The current operating system version information. Read only.
   */
  static readonly os: string

  /**
   * An array of objects containing information about the display screens
   * attached to your computer. Each object has the properties left, top,
   * right, and bottom, which contain the four corners of the drawable area of
   * each screen in global coordinates. A property primary is true if that
   * object describes the primary display.
   *
   * TODO: Type up a screen. There is no formal type in the docs, just the
   * shape.
   */
  static screens: any[]

  /**
   * The current stack trace.
   */
  static stack: string

  /**
   * When true, any attempt to write to a read-only property causes a runtime
   * error. Some objects do not permit the creation of new properties when
   * true.
   */
  static strict: boolean

  /**
   * The version number of the JavaScript engine as a three-part number and
   * description; for example: "3.92.95 (debug)" Read only.
   */
  static readonly version: string

  /**
   * Displays the About box for the ExtendScript component, and returns the
   * text of the About box as a string.
   */
  static about(): string

  /**
   * Executes a breakpoint at the current position.
   *
   * @param condition string containing a JavaScript statement to be used as a
   * condition. If the statement evaluates to true or nonzero when this point
   * is reached, execution stops. If no condition is needed, it is recommended
   * that you use the JavaScript debugger statement in the script, rather than
   * this method
   */
  static bp(condition?: string): void

  /**
   * Invokes the platform-specific color selection dialog, and returns the
   * selected color as a hexadecimal RGB value: 0xRRGGBB.
   *
   * @param name number The color to be preselected in the dialog, as a
   * hexadecimal RGB value (0xRRGGBB), or -1 for the platform default.
   */
  static colorPicker(name: number): number

  /**
   *
   * Loads a JavaScript script file from disk, evaluates it, and returns the
   * result of evaluation.
   *
   * @param path string The name and location of the file.
   *
   * @param timeout number of milliseconds to wait before returning undefined,
   * if the script cannot be evaluated. Default is 10000 milliseconds.
   */
  static evalFile(path: string, timeout?: number): any

  /**
   * Initiates garbage collection in the JavaScript engine.
   */
  static gc(): void

  /**
   * Retrieves the value of the specified environment variable, or null if no
   * such variable is defined.
   *
   * @param envname string The name of the environment variable.
   */
  static getenv(envname: string): string

  /**
   * Sets the value of the specified environment variable, if no such variable
   * is defined.
   *
   * @param envname string The name of the environment variable.
   *
   * @param value string The new value
   */
  static setenv(envname: string, value: string): void

  /**
   * Suspends the calling thread for the given number of milliseconds.
   * During a sleep period, checks at 100 millisecond intervals to see whether
   * the sleep should be terminated. This can happen if there is a break
   * request, or if the script timeout has expired.
   *
   * @param milliseconds number of milliseconds to wait.
   */
  static sleep(milliseconds: number): void

  /**
   * Writes the specified text to the JavaScript Console.
   * @param text One or more strings to write, which are concatenated to form
   * a single string.
   */
  static write(text: any, ...texts: any[]): void

  /**
   * Writes the specified text to the JavaScript Console and appends a
   * linefeed sequence.
   *
   * @param text One or more strings to write, which are concatenated to form
   * a single string.
   */
  static writeln(text: any, ...texts: any[]): void
}

/**
 * You specify the name of the library in the constructor. The constructor
 * searches for the named library using the paths defined in the static
 * property ExternalObject.searchFolders. If you are having difficulty loading
 * your library as an ExternalObject, set the property ExternalObject.log to
 * true, then call ExternalObject.search('lib:myLibrary'). This function
 * performs the search, and the log reports the paths that have been searched
 * to the ExtendScript Toolkit Console. Before loading the library, the current
 * folder is temporarily switched to the location of the found executable file.
 */
interface ExternalObject {
  /**
   * Set to true to write status information to standard output (the
   * JavaScript Console in the ExtendScript Toolkit). Set to false to turn
   * logging off. Default is false.
   */
  log: boolean

  /**
   * A set of alternate paths in which to search for the shared library files,
   * a single string with multiple path specifications delimited by
   * semicolons (;). Paths can be absolute or relative to the Folder.startup
   * location.
   */
  searchFolders: string

  /**
   * The version of the library, as returned by ESGetVersion().
   */
  version: number

  /**
   * The ExternalObject class provides this static function to help debug
   * problems with loading libraries as external object. Reports whether a
   * compiled C/C++ library can be found, but does not load it. If logging is
   * on, the paths searched are reported to the JavaScript Console in the
   * ExtendScript Toolkit. Returns true if the library is found, false
   * otherwise.
   * @param spec The file specification for the compiled library, with or
   * without path
   * information.
   */
  terminate(): void
}

declare const ExternalObject: {
  /**
   * @param filespec The specifier "lib:" is case sensitive, and serves as
   * the marker for dynamic libraries. Concatenate this to the base name of
   * the shared library, with or without an extension. ExtendScript appends a
   * file extension if necessary, according to the operating system.
   * @param args Optional. Any number of arguments to pass to the library’s
   * initialization routine.
   */
  new (filespec: string, ...args: any[]): ExternalObject

  /**
   * The ExternalObject class provides this static function to help debug
   * problems with loading libraries as external object. Reports whether a
   * compiled C/C++ library can be found, but does not load it. If logging is
   * on, the paths searched are reported to the JavaScript Console in the
   * ExtendScript Toolkit. Returns true if the library is found, false
   * otherwise.
   * @param spec The file specification for the compiled library, with or
   * without path information.
   */
  search(spec: string): boolean
}

/**
 * CSXSEvent for creating and dispatching application-level CSXS events to be
 * exposed to the frontend extension. On HTML extension side, event
 * listeners can be registered via the addEventListener API in CSInterface.js
 * to listen to CSXS events. The CSXSEvent depends on the presence of an
 * external object instance that needs to be created first:
 * let xLib = new ExternalObject("lib:\PlugPlugExternalObject");
 */
declare class CSXSEvent {
  constructor()

  /**
   * Type or name or the event, that an event listener in the HTML extension
   * can be registered to via the addEventListener API in CSInterface.js.
   */
  type: string

  /**
   * The data object of any type that gets dispatched to the frontend
   * extension.
   */
  data: any

  /**
   * Dispatches the data of the CSXSEvent instance to the HTML extension.
   */
  dispatch(): void
}

declare class File {
  /**
   * @param path string. The absolute or relative path to the file associated with
   * this object, specified in platform-specific or URI format. The value stored
   * in the object is the absolute path.
   * The path need not refer to an existing file. If not supplied, a temporary
   * name is generated.
   */
  constructor(path?: string)

  /**
   * The name of the file system. Read only. One of Windows, Macintosh, or
   * Unix.
   */
  static readonly fs: string

  /**
   * Decodes the specified string as required by RFC 2396.
   *
   * @param uri string The encoded string to decode.
   * All special characters must be encoded in UTF-8 and stored as escaped
   * characters starting with the percent sign followed by two hexadecimal
   * digits.
   *
   * For example, the string "my%20file" is decoded as "my file".
   *
   * Special characters are those with a numeric value greater than 127,
   * except the following:
   *
   * / - _ . ! ~ * ' ( )
   *
   * @return Returns the decoded string.
   */
  static decode(uri: string): string

  /**
   * Encodes the specified string as required by RFC 2396. All special
   * characters are encoded in UTF-8 and stored as escaped characters starting
   * with the percent sign followed by two hexadecimal digits.
   *
   * For example, the string "my file" is encoded as "my%20file".
   *
   * Special characters are those with a numeric value greater than 127,
   * except the following:
   *
   * / - _ . ! ~ * ' ( )
   *
   * @param name string The string to encode.
   *
   * @return the encoded string.
   */
  static encode(name: string): string

  /**
   * Checks whether a given encoding is available.
   *
   * @param name string The encoding name. Typical values are “ASCII,”
   * “binary,” or “UTF-8.”
   *
   * @return true if your system supports the specified encoding, false
   * otherwise.
   */
  static isEncodingAvailable(name: string): boolean

  /**
   *
   * Opens the built-in platform-specific file-browsing dialog in which a user
   * can select an existing file or multiple files, and creates new File
   * objects to represent the selected files.
   *
   * @param prompt string A string containing the prompt text, if the dialog
   * allows a prompt.
   *
   * @param filter string A filter that limits the types of files displayed in
   * the dialog.
   * In Windows, a filter expression, such as "JavaScript:*.jsx;All files:*.*"
   * In Mac OS, a filter function that takes a File instance and returns true
   * if the file
   * should be included in the display, false if it should not.
   *
   * @param multiSelect boolean. When true, the user can select multiple files
   * and the return value is an array. Default is false.
   *
   * @returns a File object for the selected file if the user clicks OK, or an
   * array of objects if multiple files are selected. If the user cancels,
   * returns null.
   *
   * TODO: return `(File|File[])` in TSC 1.4
   */
  static openDialog(prompt_?: string, filter?: string, multiSelect?: boolean): any

  /**
   * Opens the built-in platform-specific file-browsing dialog in which a user
   * can select an existing file location to which to save information, and
   * creates a new File object to represent the selected file location.
   *
   * @param prompt string A string containing the prompt text, if the dialog
   * allows a prompt.
   *
   * @param filter string (Windows only). A filter that limits the types of
   * files displayed in the dialog. A filter expression, such as
   * "JavaScript:*.jsx;All files:*.*".
   *
   * @return a File object for the selected file location if the user clicks
   * OK, or null otherwise.
   */
  static saveDialog(prompt_?: string, filter?: string): File

  /**
   * The full path name for the referenced file in URI notation. Read only.
   */
  readonly absoluteURI: string

  /**
   * When true, the object refers to a file system alias or shortcut. Read
   * only.
   */
  alias: boolean

  /**
   * The creation date of the referenced file, or null if the object does not
   * refer to a file on disk. Read only.
   */
  readonly created: Date

  /**
   * In Mac OS, the file creator as a four-character string. In Windows or
   * UNIX, value is "????". Read only.
   */
  readonly creator: string

  /**
   * The localized name of the referenced file, without the path. Read only.
   */
  readonly displayName: string

  /**
   *
   * Gets or sets the encoding for subsequent read/write operations. If the
   * value is not recognized, uses the system default encoding.
   *
   * A special encoder, BINARY, is used to read binary files. It stores each
   * byte of the file as one Unicode character regardless of any encoding.
   * When writing, the lower byte of each Unicode character is treated as a
   * single byte to write.
   */
  encoding: string

  /**
   * When true, a read attempt caused the current position to be at the end of
   * the file, or the file is not open. Read only.
   */
  readonly eof: boolean

  /**
   * A message describing the last file system error. Typically set by the
   * file system, but a script can set it. Setting this value clears any error
   * message and resets the error bit for opened files. Contains the empty
   * string if there is no error.
   */
  error: string

  /**
   * When true, this object refers to a file or file-system alias that
   * actually exists in the file system. Read only.
   */
  readonly exists: boolean

  /**
   * The platform-specific full path name for the referenced file. Read only.
   */
  readonly fsName: string

  /**
   * The full path name for the referenced file in URI notation. Read only.
   */
  readonly fullName: string

  /**
   * When true, the file is not shown in the platform-specific file browser.
   * Read/write. If the object references a file-system alias or shortcut, the
   * flag is altered on the alias, not on the original file.
   */
  hidden: boolean

  /**
   * The size of the file in bytes. Can be set only for a file that is not
   * open, in which case it truncates or pads the file with 0-bytes to the new
   * length.
   */
  length: number

  /**
   * How line feed characters are written in the file system. One of:
   * Windows — Windows style
   * Macintosh — Mac OS style
   * Unix — UNIX style
   */
  lineFeed: string

  /**
   * A localized version of the file name portion of the absolute URI for the
   * referenced file, without the path specification. Read only.
   */
  readonly localizedName: string

  /**
   * The date of the referenced file’s last modification, or null if the
   * object does not refer to a file on disk. Read only.
   */
  readonly modified: Date

  /**
   * The file name portion of the absolute URI for the referenced file,
   * without the path specification. Read only.
   */
  readonly name: string

  /**
   * The Folder object for the folder that contains this file. Read only.
   */
  readonly parent: Folder

  /**
   * The path portion of the absolute URI for the referenced file, without the
   * file name. Read only.
   */
  readonly path: string

  /**
   * When true, prevents the file from being altered or deleted. If the
   * referenced file is a file-system alias or shortcut, the flag is altered
   * on the alias, not on the original file.
   */
  readonly: boolean

  /**
   * The path name for the referenced file in URI notation, relative to the
   * current folder. Read only.
   */
  readonly relativeURI: string

  /**
   * The file type as a four-character string.
   * In Mac OS, the Mac OS file type.
   * In Windows, "appl" for .EXE files, "shlb" for .DLL files and "TEXT" for
   * any other file.
   * If the file does not exist, the value is "????". Read only.
   */
  readonly type: string

  /**
   * Changes the path specification of the referenced file.
   *
   * @param path string containing the new path, absolute or relative to the
   * current folder.
   *
   * @return true on success.
   */
  changePath(path: string): string

  /**
   * Closes this open file.
   *
   * @return true on success, false if there are I/O errors.
   */
  close(): boolean

  /**
   * Copies this object’s referenced file to the specified target location.
   * Resolves any aliases to find the source file. If a file exists at the
   * target location, it is overwritten.
   *
   * @param target string with the URI path to the target location, or a File
   * object that references the target location.
   *
   * @return true if the copy was successful, false otherwise.
   */
  copy(target: string): boolean

  /**
   * Makes this file a file-system alias or shortcut to the specified file.
   * The referenced file for this object must not yet exist on disk.
   *
   * @param path string containing the path of the target file.
   *
   * @return true if the operation was successful, false otherwise.
   */
  createAlias(path?: string): boolean

  /**
   * Opens this file using the appropriate application, as if it had been
   * double-clicked in a file browser.
   * You can use this method to run scripts, launch applications, and so on.
   *
   * @return true immediately if the application launch was successful.
   */
  execute(): boolean

  /**
   * Retrieves the URI for this file, relative to the specified base path, in
   * URI notation. If no base path is supplied, the URI is relative to the
   * path of the current folder.
   *
   * @param basePath string Default is the current folder.
   *
   * @return a string containing the relative URI.
   */
  getRelativeURI(basePath?: string): string

  /**
   * Opens the referenced file for subsequent read/write operations. The
   * method resolves any aliases to find the file.
   *
   * The method attempts to detect the encoding of the open file. It reads a
   * few bytes at the current location and tries to detect the Byte Order Mark
   * character 0xFFFE. If found, the current position is advanced behind the
   * detected character and the encoding property is set to one of the strings
   * UCS-2BE, UCS-2LE, UCS4-BE, UCS-4LE, or UTF-8. If the marker character is
   * not found, it checks for zero bytes at the current location and makes an
   * assumption about one of the above formats (except UTF-8). If everything
   * fails, the encoding property is set to the system encoding.
   *
   * NOTE: Be careful about opening a file more than once. The operating
   * system usually permits you to do so, but if you start writing to the file
   * using two different File objects, you can destroy your data.
   *
   * @param mode string indicating the read/write mode. One of:
   * r: (read) Opens for reading. If the file does not exist or cannot be
   *    found, the call fails.
   * w: (write) Opens a file for writing. If the file exists, its contents are
   *    destroyed. If the file does not exist, creates a new, empty file.
   * e: (edit) Opens an existing file for reading and writing.
   * a: (append) Opens the file in Append mode, and moves the current position
   *    to the end of the file.
   *
   * @param type string In Mac OS, the type of a newly created file, a
   * 4-character string. Ignored in Windows and UNIX.
   *
   * @param creator string In Mac OS, the creator of a newly created file, a
   * 4-character string. Ignored in Windows and UNIX.
   *
   * @return true if the file has been opened successfully, false otherwise.
   */
  open(mode: string, type?: string, creator?: string): boolean

  /**
   * Opens the built-in platform-specific file-browsing dialog, in which the
   * user can select an existing file or files, and creates new File objects
   * to represent the selected files. Differs from the class method
   * openDialog() in that it presets the current folder to this File object’s
   * parent folder and the current file to this object’s associated file.
   *
   * @param prompt string containing the prompt text, if the dialog allows a
   * prompt.
   *
   * @param filter string A filter that limits the types of files displayed in
   * the dialog.
   *  In Windows, a filter expression, such as "JavaScript:*.jsx;All
   *  files:*.*"
   *  In Mac OS, a filter function that takes a File instance and returns true
   *  if the file should be included in the display, false if it should not.
   *
   * @param multiSelect boolean. When true, the user can select multiple files
   * and the return value is an array. Default is false.
   *
   * @return a File or Folder object for the selected file or folder if the
   * user clicks OK, or an array of objects. If the user cancels, returns
   * null.
   *
   * TODO: return `(File|File[])` in TSC 1.4
   */
  OpenDlg(prompt_?: string, filter?: string, multiSelect?: boolean): any

  /**
   * Reads the contents of the file starting at the current position.
   *
   * @param chars number An integer specifying the number of characters to
   * read. By default, reads from the current position to the end of the file.
   * If the file is encoded, multiple bytes might be read to create single
   * Unicode characters.
   *
   * @return a string that contains up to the specified number of characters.
   */
  read(chars?: number): string

  /**
   * Reads a single text character from the file at the current position. Line
   * feeds are recognized as CR, LF, CRLF, or LFCR pairs. If the file is
   * encoded, multiple bytes might be read to create single Unicode
   * characters.
   *
   * @return a string that contains the character.
   */
  readch(): string

  /**
   * Reads a single line of text from the file at the current position, and
   * returns it in a string. Line feeds are recognized as CR, LF, CRLF, or
   * LFCR pairs. If the file is encoded, multiple bytes might be read to
   * create single Unicode characters.
   *
   * @return a string that contains the text.
   */
  readln(): string

  /**
   * Deletes the file associated with this object from disk, immediately,
   * without moving it to the system trash. Does not resolve aliases; instead,
   * deletes the referenced alias or shortcut file itself.
   *
   * NOTE: Cannot be undone. It is recommended that you prompt the user for
   * permission before deleting.
   *
   * @return true if the file is deleted successfully.
   */
  remove(): boolean

  /**
   * Renames the associated file. Does not resolve aliases, but renames the
   * referenced alias or shortcut file itself.
   *
   * @param newName string The new file name, with no path.
   *
   * @return true on success.
   */
  rename(newName: string): boolean

  /**
   * If this object references an alias or shortcut, this method resolves that
   * alias and returns a new File object that references the file-system
   * element to which the alias resolves.
   *
   * @return the new File object, or null if this object does not reference an
   * alias, or if the alias cannot be resolved.
   */
  resolve(): File

  /**
   * Opens the built-in platform-specific file-browsing dialog, in which the
   * user can select an existing file location to which to save information,
   * and creates a new File object to represent the selected file.  Differs
   * from the class method saveDialog() in that it presets the current folder
   * to this File object’s parent folder and the file to this object’s
   * associated file.
   *
   * @param prompt string containing the prompt text, if the dialog allows a
   * prompt.
   *
   * @param preset string (Windows only). A filter that limits the types of
   * files displayed in the dialog. A filter expression, such as
   * "JavaScript:*.jsx;All files:*.*"
   *
   * @return a File object for the selected file if the user clicks OK. If the
   * user cancels, returns null.
   */
  saveDlg(prompt_?: string, preset?: string): File

  /**
   * Seeks to the specified position in the file. The new position cannot be
   * less than 0 or greater than the current file size.
   *
   * @param pos number The new current position in the file as an offset in
   * bytes from the start, current position, or end, depending on the mode.
   *
   * @param mode number The seek mode, one of:
   * 0: Seek to absolute position, where pos=0 is the first byte of the file.
   *    This is the default.
   * 1: Seek relative to the current position.
   * 2: Seek backward from the end of the file.
   *
   * @return true if the position was changed.
   */
  seek(pos: number, mode?: number): boolean

  /**
   * Retrieves the current position as a byte offset from the start of the
   * file.
   *
   * @return a number, the position index.
   */
  tell(): number

  /**
   * Writes the specified text to the file at the current position. For
   * encoded files, writing a single Unicode character may write multiple
   * bytes.
   *
   * NOTE: Be careful not to write to a file that is open in another
   * application or object, as this can overwrite existing data.
   *
   * @param text string One or more strings to write, which are concatenated
   * to form a single string.
   *
   * @return true on success.
   */
  write(text: string, ...texts: string[]): boolean

  /**
   * Writes the specified text to the file at the current position, and
   * appends a Line Feed sequence in the style specified by the linefeed
   * property.For encoded files, writing a single Unicode character may write
   * multiple bytes.
   *
   * NOTE: Be careful not to write to a file that is open in another
   * application or object, as this can overwrite existing data.
   *
   * @param text string One or more strings to write, which are concatenated
   * to form a single string.
   *
   * @return true on success.
   */
  writeln(text: string, ...texts: string[]): boolean
}

declare class Folder {
  /**
   * @param path string. The absolute or relative path to the folder
   * associated with this object, specified in URI format. The path need not
   * refer to an existing folder. If not supplied, a temporary name is
   * generated.
   */
  constructor(path?: string)

  /**
   * A Folder object for the folder that contains application data for all
   * users. Read only.
   *
   * In Windows, the value of %APPDATA% (by default, C:\Documents and
   * Settings\All Users\Application Data)
   *
   * In Mac OS, /Library/Application Support
   */
  static readonly appData: Folder

  /**
   * In Mac OS, the Folder object for the folder that contains the bundle of
   * the running application. Read only.
   */
  static readonly appPackage: Folder

  /**
   * A Folder object for the folder that contains application data for the
   * current user. Read only.
   *
   * In Windows, the value of %CommonProgramFiles% (by default,
   * C:\Program Files\Common Files)
   *
   * * In Mac OS,/Library/Application Support
   */
  static readonly commonFiles: Folder

  /**
   * A Folder object for the current folder. Assign either a Folder object or
   * a string containing the new path name to set the current folder.
   */
  static current: Folder

  /**
   * A Folder object for the folder that contains the user’s desktop. Read
   * only.
   *
   * In Windows, C:\Documents and Settings\username\Desktop
   *
   * In Mac OS, ~/Desktop
   */
  static desktop: Folder

  /**
   * The name of the file system. Read only. One of Windows, Macintosh, or
   * Unix.
   */
  static readonly fs: string

  /**
   * A Folder object for the user’s default document folder. Read only.
   *
   * In Windows, C:\Documents and Settings\username\My Documents
   *
   * In Mac OS, ~/Documents
   */
  static readonly myDocuments: Folder

  /**
   * A Folder object for the folder containing the executable image of the
   * running application. Read only.
   */
  static readonly startup: Folder

  /**
   * A Folder object for the folder containing the operating system files.
   * Read only.
   *
   * In Windows, the value of %windir% (by default, C:\Windows)
   *
   * In Mac OS, /System
   */
  static readonly system: Folder

  /**
   * A Folder object for the default folder for temporary files. Read only.
   */
  static readonly temp: Folder

  /**
   * In Mac OS, a Folder object for the folder containing deleted items.
   *
   * In Windows, where the Recycle Bin is a database rather than a folder,
   * value is null.
   *
   * Read only.
   */
  static readonly trash: Folder

  /**
   * In Mac OS, a Folder object for the folder containing deleted items.
   *
   * In Windows, where the Recycle Bin is a database rather than a folder,
   * value is null.
   */
  static userData: Folder

  /**
   * Decodes the specified string as required by RFC 2396.
   *
   * All special characters must be encoded in UTF-8 and stored as escaped
   * characters starting with the percent sign followed by two hexadecimal
   * digits. For example, the string "my%20file" is decoded as "my file".
   *
   * Special characters are those with a numeric value greater than 127,
   * except the following:
   *
   *  / - _ . ! ~ * ' ( )
   *
   * @param string uri The encoded string to decode.
   *
   * @return string the decoded string.
   */
  static decode(uri: string): string

  /**
   * Encodes the specified string as required by RFC 2396. All special
   * characters are encoded in UTF-8 and stored as escaped characters starting
   * with the percent sign followed by two hexadecimal digits.  For example,
   * the string "my file" is encoded as "my%20file".
   *
   * Special characters are those with a numeric value greater than 127,
   * except the following:
   *
   * / - _ . ! ~ * ' ( )
   *
   * @param string the string to encode.
   *
   * @return string the encoded string.
   */
  static encode(name: string): string

  /**
   * Checks whether a given encoding is available.
   *
   * @param string name  The encoding name. Typical values are “ASCII,”
   * “binary,” or “UTF-8.
   *
   * @return boolean Returns true if your system supports the specified
   * encoding, false otherwise.
   */
  static isEncodingAvailable(name: string): boolean

  /**
   * Opens the built-in platform-specific file-browsing dialog, and creates a
   * new File or Folder object for the selected file or folder. Differs from
   * the object method selectDlg() in that it does not preselect a folder.
   *
   * @param [string] prompt A string containing the prompt text, if the
   * dialog allows a prompt.
   *
   * @return If the user clicks OK, returns a File or Folder object for the
   * selected file or folder. If the user cancels, returns null.
   *
   * TODO: return `(File|Folder)` in TSC 1.4
   */
  static selectDialog(prompt?: string): any

  /**
   * The full path name for the referenced folder in URI notation. Read only.
   */
  readonly absoluteURI: string

  /**
   * When true, the object refers to a file system alias or shortcut. Read
   * only.
   */
  alias: boolean

  /**
   * The creation date of the referenced folder, or null if the object does
   * not refer to a folder on disk. Read only.
   */
  readonly created: Date

  /**
   * The localized name of the referenced folder, without the path. Read only.
   */
  readonly displayName: string

  /**
   * A message describing the most recent file system error Typically set by
   * the file system, but a script can set it. Setting this value clears any
   * error message and resets the error bit for opened files. Contains the
   * empty string if there is no error.
   */
  error: string

  /**
   * When true, this object refers to a folder that currently exists in the
   * file system. Read only.
   */
  readonly exists: boolean

  /**
   * The platform-specific name of the referenced folder as a full path name.
   * Read only.
   */
  readonly fsName: string

  /**
   * The full path name for the referenced folder in URI notation. Read only.
   */
  readonly fullName: string

  /**
   * A localized version of the folder name portion of the absolute URI for
   * the referenced file, without the path specification. Read only.
   */
  readonly localizedName: string

  /**
   * The date of the referenced folder’s last modification, or null if the
   * object does not refer to a folder on disk. Read only.
   */
  readonly modified: Date

  /**
   * The folder name portion of the absolute URI for the referenced file,
   * without the path specification. Read only.
   */
  readonly name: string

  /**
   * The Folder object for the folder that contains this folder, or null if
   * this object refers to the root folder of a volume. Read only.
   */
  readonly parent: Folder

  /**
   * The path portion of the absolute URI for the referenced folder, without
   * the folder name. Read only.
   */
  readonly path: string

  /**
   * The path name for the referenced folder in URI notation, relative to the
   * current folder. Read only.
   */
  readonly relativeURI: string

  /**
   * Changes the path specification of the referenced folder.
   *
   * @param path string containing the new path, absolute or relative to the
   * current parent folder.
   *
   * @return true on success.
   */
  changePath(path: string): boolean

  /**
   * Creates a folder at the location given by this object’s path property.
   * @return true if the folder was created successfully.
   */
  create(): boolean

  /**
   * Opens this folder in the platform-specific file browser (as if it had
   * been double-clicked in the file browser).
   *
   * @return true immediately if the folder was opened successfully.
   */
  execute(): boolean

  /**
   * param mask string. A search mask for file names. A string that can
   * contain question mark (?) and asterisk (*) wild cards. Default is "*",
   * which matches all file names.  Can also be the name of a function that
   * takes a File or Folder object as its argument.
   *
   * It is called for each file or folder found in the search; if it returns
   * true, the object is added to the return array.  NOTE: In Windows, all
   * aliases end with the extension .lnk; ExtendScript strips this from the
   * file name when found, in order to preserve compatibility with other
   * operating systems. You can search for all aliases by supplying the search
   * mask "*.lnk", but note that such code is not portable.  Retrieves the
   * contents of this folder, filtered by the supplied mask.
   *
   * @return Returns an array of File and Folder objects, or null if this
   * object's referenced folder does not exist.
   *
   * TODO: return `(File|Folder)[]` in TSC 1.4
   */
  getFiles(mask?: string): any[]

  /**
   * Retrieves the path for this folder relative to the specified base path or
   * the current folder, in URI notation.
   *
   * @param basePath string. A string containing the base path for the
   * relative URI. Default is the current folder.
   *
   * @reutrn a string containing the relative URI.
   */
  getRelativeURI(basePath?: string): string

  /**
   *
   * Deletes the empty folder associated with this object from disk,
   * immediately, without moving it to the system trash. Folders must be empty
   * before they can be deleted. Does not resolve aliases; instead, deletes
   * the referenced alias or shortcut file itself.
   *
   * NOTE: Cannot be undone. It is recommended that you prompt the user for
   * permission before deleting.
   *
   * @return true if the folder is deleted successfully.
   */
  remove(): boolean

  /**
   * Renames the associated folder. Does not resolve aliases; instead,
   * renames the referenced alias or shortcut file itself.
   *
   * @param newName string The new folder name, with no path.
   *
   * @return true on success.
   */
  rename(newName: string): boolean

  /**
   * If this object references an alias or shortcut, this method resolves that
   * alias.
   *
   * @return a new Folder object that references the file-system element
   * to which the alias resolves, or null if this object does not reference an
   * alias, or if the alias cannot be resolved.
   */
  resolve(): Folder

  /**
   * Opens the built-in platform-specific file-browsing dialog, and creates
   * a new File or Folder object for the selected file or folder. Differs
   * from the class method selectDialog() in that it preselects
   *
   * @param prompt A string containing the prompt text, if the dialog allows a
   * prompt.
   *
   * @return a File or Folder object for the selected file or folder if the
   * user clicks OK. If the user cancels, returns null.
   *
   * TODO: return `(File|Folder)` in TSC 1.4
   */
  selectDlg(prompt_: string): any
}

/**
 * The globally available ScriptUI class provides central information about the
 * ScriptUI module. This object is not instantiable.
 */
declare let ScriptUI: any

/**
 * The globally available Window class provides access to user notification
 * tools like Window.alert(), Window.confirm(), Windof.find() and Window.prompt
 * ().
 *
 * The global Window has provides different functions from instantiated windows.
 * The constructor creates and returns a new Window object, or null if window
 * creation failed. Example:
 * new Window (type [, title, bounds, {creation_properties}]);
 */
declare let Window: any

/**
 * Controls the automatic layout behavior for a window or container. The
 * subclass AutoLayoutManager implements the default automatic layout behavior.
 * Create an instance of the AutoLayoutManager class with the new operator:
 * myWin.layout = new AutoLayoutManager(myWin);
 */
declare let AutoLayoutManager: any

//*** ExtendScript reflection interface ***//

/**
 * ExtendScript provides a reflection interface that allows you to find out
 * everything about an object, including its name, a description, the expected
 * data type for properties, the arguments and return value for methods, and
 * any default values or limitations to the input values.
 * NOTE reg. Typescript: Asks for a reflect property on every Extendscript
 * object declaration. Functionality of reflection can be replaced by
 * Typescript declarations.
 */
interface Reflection {
  /**
   * Short text describing the reflected object, or undefined if no
   * description is available.
   */
  readonly description: string | undefined

  /**
   * Longer text describing the reflected object more completely, or
   * undefined if no description is available.
   */
  readonly help: string | undefined

  /**
   * An Array of ReflectionInfo objects containing all methods of the
   * reflected object, defined in the class or in the specific instance.
   */
  readonly methods: ReflectionInfo[]

  /**
   * The class name of the reflected object.
   */
  readonly name: string

  /**
   * An Array of ReflectionInfo objects containing all properties of the
   * reflected object, defined in the class or in the specific instance. For
   * objects with dynamic properties (defined at runtime) the list contains
   * only those dynamic properties that have already been accessed by
   * the script. For example, in an object wrapping an HTML tag, the names of
   * the HTML attributes are determined at run time.
   */
  readonly properties: ReflectionInfo[]

  /**
   * Returns the ReflectionInfo object for the named property of the
   * reflected object, or null if no such property exists. Use this method to
   * get information about dynamic properties that have not yet been accessed,
   * but that are known to exist.
   * @param name The property for which to retrieve information.
   */
  find(name: string): ReflectionInfo | null
}

interface ReflectionInfo {
  /**
   * For a reflected method, an array of ReflectionInfo objects describing
   * each method argument.
   */
  readonly arguments: ReflectionInfo[]

  /**
   * The data type of the reflected element. One of: boolean, number, string,
   * Classname: The class name of an object. NOTE: Class names start with a
   * capital letter. Thus, the value string stands for a JavaScript string,
   * while String is a JavaScript String wrapper object.
   * *: Any type. This is the default. null, undefined: Return data type for
   * a function that does not return any value. unknown
   */
  readonly dataType: string

  /**
   * The default value for a reflected property or method argument, or
   * undefined if there is no default value, if the property is undefined, or
   * if the element is a method.
   */
  readonly defaultValue: any | undefined

  /**
   * Short text describing the reflected object, or undefined if no
   * description is available.
   */
  readonly description: string | undefined

  /**
   * Longer text describing the reflected object more completely, or
   * undefined if no description is available.
   */
  readonly help: string | undefined

  /**
   * When true, the reflected property or method returns a collection;
   * otherwise, false.
   */
  readonly isCollection: boolean

  /**
   * The maximum numeric value for the reflected element, or undefined if
   * there is no maximum or if the element is a method.
   */
  readonly max: number | undefined

  /**
   * The minimum numeric value for the reflected element, or undefined if
   * there is no minimum or if the element is a method.
   */
  readonly min: number | undefined

  /**
   * The name of the reflected element. A string, or a number for an array
   * index.
   */
  readonly name: string | number

  /**
   * The type of the reflected element. One of:
   * readonly: A Read only property.
   * readwrite: A read-write property.
   * createonly: A property that is valid only during creation of an object.
   * method: A method.
   */
  readonly type: string
}

//*** Global localize function ***//

/**
 * The globally available localize function can be used to provide localized
 * strings anywhere a displayed text value is specified. The function takes a
 * specially formatted set of localized versions of a display string, and
 * returns the version appropriate to the current locale.
 */
declare function localize(localization_obj: Object, ...args: any[]): string
declare function localize(ZString: string): string

//*** Global User notification dialogs ***//

/**
 * Displays a dialog containing a short message and an OK button.
 * @param message The string for the displayed message.
 * @param title Optional. A string to appear as the title of the dialog, if the
 * platform supports a title. Mac OS does not support titles for alert dialogs.
 * The default title string is "Script Alert."
 * @param errorIcon Optional. When true, the platform-standard alert icon is
 * replaced by the platform-standard error icon in the dialog. Default is false.
 */
declare function alert(message: string, title?: string, errorIcon?: boolean): void

/**
 * Displays a dialog containing a short message and two buttons labeled
 * Yes and No. Returns true if the user clicked Yes, false if the user clicked
 * No.
 * @param message The string for the displayed message.
 * @param noAsDflt Optional. When true, the No button is the default choice,
 * selected when the user types ENTER. Default is false, meaning that Yes is
 * the default choice.
 * @param title Optional. A string to appear as the title of the dialog, if the
 * platform supports a title. Mac OS does not support titles for confirmation
 * dialogs. The default title string is "Script Alert."
 */
declare function confirm(message: string, noAsDflt?: boolean, title?: string): boolean

/**
 * Displays a dialog containing a short message, a text edit field, and two
 * buttons labeled OK and Cancel.
 * @param message The string for the displayed message.
 * @param preset The initial value to be displayed in the text edit field.
 * @param title Optional. A string to appear as the title of the dialog. On
 * Windows, this appears in the window’s frame, while on Mac OS it appears
 * above the message. The default title string is "Script Prompt."
 */
declare function prompt(message: string, preset: string, title?: string): boolean

//*** UnitValue ***//

/**
 * Represents measurement values that contain both the numeric magnitude and
 * the unit of measurement.
 */
interface UnitValue {
  /**
   * A UnitValue object that defines the size of one pixel, or a total size
   * to use as a base for percentage values. This is used as the base
   * conversion unit for pixels and percentages; see Converting pixel and
   * percentage values.
   * Default is 0.013889 inches (1/72 in), which is the base conversion unit
   * for pixels at 72 dpi. Set to null to restore the default.
   */
  baseUnit: UnitValue | null

  /**
   * The unit type in abbreviated form; for example, "cm" or "in".
   */
  type: _ScaleUnit

  /**
   * The numeric measurement value.
   */
  value: number

  /**
   * Returns the numeric value of this object in the given unit. If the unit
   * is unknown or cannot be computed, generates a run-time error.
   */
  as(unit: _ScaleUnit): number

  /**
   * Converts this object to the given unit, resetting the type and value
   * accordingly. Returns true if the conversion is successful. If the unit
   * is unknown or the object cannot be converted, generates a run-time error
   * and returns false.
   */
  convert(unit: _ScaleUnit): boolean
}

declare const UnitValue: {
  /**
   * A UnitValue object that defines the size of one pixel, or a total size
   * to use as a base for percentage values. This is used as the base
   * conversion unit for pixels and percentages; see Converting pixel and
   * percentage values.
   * Default is 0.013889 inches (1/72 in), which is the base conversion unit
   * for pixels at 72 dpi. Set to null to restore the default.
   */
  baseUnit: UnitValue | null

  /**
   * Represents measurement values that contain both the numeric magnitude
   * and the unit of measurement.The UnitValue constructor creates a new
   * UnitValue object.
   */
  new (value: number | string, unit?: _ScaleUnit): UnitValue & number

  /**
   * Represents measurement values that contain both the numeric magnitude
   * and the unit of measurement.The UnitValue constructor creates a new
   * UnitValue object.
   * The keyword new is optional.
   */
  (value: number | string, unit?: _ScaleUnit): UnitValue & number
}

/**
 * The unit is specified with a string in abbreviated, singular, or plural form.
 */
type _ScaleUnit =
  | 'in'
  | 'inch'
  | 'inches'
  | 'ft'
  | 'foot'
  | 'feet'
  | 'yd'
  | 'yard'
  | 'yards'
  | 'mi'
  | 'mile'
  | 'miles'
  | 'mm'
  | 'millimeter'
  | 'millimeters'
  | 'cm'
  | 'centimeter'
  | 'centimeters'
  | 'm'
  | 'meter'
  | 'meters'
  | 'km'
  | 'kilometer'
  | 'kilometers'
  | 'pt'
  | 'point'
  | 'points'
  | 'pc'
  | 'pica'
  | 'picas'
  | 'tpt'
  | 'traditional point'
  | 'traditional points'
  | 'tpc'
  | 'traditional pica'
  | 'traditional picas'
  | 'ci'
  | 'cicero'
  | 'ciceros'
  | 'px'
  | 'pixel'
  | 'pixels'
  | '%'
  | 'percent'
  | 'percent'

/*** XML object ***/

/**
 * The XML object provides both static properties and functions, available
 * through the XML class, and dynamic properties and functions available
 * through each instance.
 */
declare let XML: any

/*** Global XML functions ***/

/**
 * Reports whether a string contains a name that conforms to valid XML syntax.
 * NOTE: This implementation uses the same rules as for a JavaScript name,
 * except for the '$' character, which is disallowed, and the '-' character,
 * which as added. It does not follow the W3C definition of an XML name, which
 * adds more Unicode characters to the valid set of characters. Returns true if
 * the name is a valid XML name, false otherwise.
 */
declare function isXMLName(name: string): boolean

/** Sets the default namespace for XML objects. You can also set the default
 * namespace using this syntax:
 * default xml namespace = Namespace object
 * default xml namespace = URL_string
 */
declare function setDefaultXMLNamespace(ns: Namespace): void

/*** QName object ***/

/**
 * This object encapsulates a fully qualified XML name, the combination of a
 * local XML name and its namespace URI.
 */
interface QName {
  /**
   * The local element name portion of the XML element’s fully qualified XML
   * name.
   */
  name: string

  /**
   * The namespace prefix of the XML element’s fully qualified XML name.
   */
  uri: string

  /**
   * When no arguments are supplies, creates a QName object with an empty
   * local name and no URI.
   */
  new (): QName

  /**
   * Creates a copy of an existing QName object.
   */
  new (name: string): QName

  /**
   * Creates a QName object with an empty local name and the URI of the
   * Namespace object.
   */
  new (ns: Namespace): QName

  /**
   * Creates a QName object with the given local name and the URI of the
   * default namespace. Can be the wildcard character, "*".
   */
  new (uri: string, name: string): QName
}

declare const QName: QName

/*** Namespace object ***/

/**
 * This object encapsulates the definition of an XML namespace. A namespace
 * associates an XML-name prefix with a complete URI. The prefix is a string
 * that precedes the local name of an XML element or attribute and identifies
 * the namespace, while the URI points to the actual location where the
 * definition of the namespace is found.
 * For example, this XML definition contains a namespace declaration:
 * <?xml xmlns:adobe=http://www.adobe.com/test?>
 * In the corresponding namespace, the prefix is adobe, and the URI is
 * http://www.adobe.com/test.
 */
interface Namespace {
  /**
   * The element-name prefix associated with the namespace URI. The prefix
   * value can be undefined, as when a specified prefix is not a valid XML
   * name. Namespaces with an undefined prefix are completely ignored; they
   * are not added to an XML namespace declaration.
   */
  prefix: string

  /**
   * The location of the namespace definition, a URI.
   */
  uri: string

  /**
   * When no argument is supplied, creates a namespace with an empty prefix
   * and URI.
   */
  new (): Namespace

  /**
   * Creates a Namespace object with an empty prefix and the given URI.
   */
  new (uri: string): Namespace

  /**
   * Creates a namespace with an empty prefix and the URI set to the URI of
   * the QName object (if the QName object contains a URI).
   */
  new (preix: QName): Namespace

  /**
   * Creates a copy of the given Namespace object. If the Namespace()
   * function is called without the new operator, and the only argument is a
   * Namespace object, the function simply returns that object, rather than
   * creating a copy.
   */
  new (ns: Namespace): Namespace

  /**
   * Creates a Namespace object with the given prefix and the given URI.
   */
  new (prefix: string, ns: Namespace): Namespace
}

declare const Namespace: Namespace

/*** XMP Script ***/

/**
 * Provides the core services of the XMP Toolkit.
 */
declare let XMPMeta: any

/**
 * Provides convenient I/O access to the main, or document level, XMP for a
 * file.
 */
declare let XMPFile: any

/**
 * Provides additional utility functions for array handling.
 */
declare let XMPUtils: any

/**
 * Represents date-time values.
 */
declare let XMPDateTime: any

/**
 * Contains numeric and string varant values for use with the JavaScript API.
 */
declare let XMPvar: any

/**
 * Allows iteration through properties in an XMPMeta object.
 */
declare let XMPIterator: any

/**
 * Describes a metadata property.
 */
declare let XMPProperty: any

/**
 * Describes a metadata alias.
 */
declare let XMPAliasInfo: any

/**
 * Describes a file.
 */
declare let XMPFileInfo: any

/**
 * Describes a raw XMP packet in a file.
 */
declare let XMPPacketInfo: any
////////////////////////////////////////////////////////////////////////////////
//
// This file was generated. Do not modify.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Method to use for interpreting selective color adjustment specifications:
 * ABSOLUTE = % of the whole. RELATIVE = % of the existing color amount. Pass to
 * ArtLayer.selectiveColor().
 */
declare enum AdjustmentReference {
  ABSOLUTE,
  RELATIVE,
}

/**
 * The point around which to transform an object. This is the point that does
 * not move when an object is rotated or resized using methods in ArtLayer,
 * LayerSet, and Selection, or when the entire canvas is resized with
 * Document.resizeCanvas().
 */
declare enum AnchorPosition {
  BOTTOMCENTER,
  BOTTOMLEFT,
  BOTTOMRIGHT,
  MIDDLECENTER,
  MIDDLELEFT,
  MIDDLERIGHT,
  TOPCENTER,
  TOPLEFT,
  TOPRIGHT,
}

/**
 * Method to use to smooth edges by softening the color transition between edge
 * pixels and background pixels. Used in a TextItem.antiAliasMethod.
 */
declare enum AntiAlias {
  CRISP,
  NONE,
  SHARP,
  SMOOTH,
  STRONG,
}

/**
 * The type of kerning to use for characters. Used in TextItem.autoKerning.
 */
declare enum AutoKernType {
  MANUAL,
  METRICS,
  OPTICAL,
}

/**
 * The destination, if any, for batch-processed files, specified in the
 * BatchOptions used with the Application.batch() method: FOLDER: Save modified
 * versions of the files to a new location (leaving the originals unchanged).
 * NODESTINATIONTYPE: Leave all files open. SAVEANDCLOSE: Save changes and close
 * the files. Adobe Photoshop CC JavaScript Scripting Reference Scripting
 * Constants 198
 */
declare enum BatchDestinationType {
  FOLDER,
  NODESTINATION,
  SAVEANDCLOSE,
}

/**
 * Specifies the quality of an image you are converting to bitmap mode. Used in
 * BitmapConversionOptions.
 */
declare enum BitmapConversionType {
  CUSTOMPATTERN,
  DIFFUSIONDITHER,
  HALFTHRESHOLD,
  HALFTONESCREEN,
  PATTERNDITHER,
}

/**
 * Specifies the shape of the dots (ink deposits) in the halftone screen. Used
 * in BitmapConversionOptions.
 */
declare enum BitmapHalfToneType {
  CROSS,
  DIAMOND,
  ELLIPSE,
  LINE,
  ROUND,
  SQUARE,
}

/**
 * The number of bits per color channel. Value of Document.bitsPerChannel; pass
 * to Documents.add(). Also used in PDFOpenOptions and CameraRAWOpenOptions.
 */
declare enum BitsPerChannelType {
  EIGHT,
  ONE,
  SIXTEEN,
  THIRTYTWO,
}

/**
 * Controls how pixels in an image are blended when a filter is applied. The
 * value of ArtLayer.blendMode and LayerSet.blendMode.
 */
declare enum BlendMode {
  COLORBLEND,
  COLORBURN,
  COLORDODGE,
  DARKEN,
  DIFFERENCE,
  DISSOLVE,
  DIVIDE,
  EXCLUSION,
  HARDLIGHT,
  HARDMIX,
  HUE,
  LIGHTEN,
  LINEARBURN,
  LINEARDODGE,
  LINEARLIGHT,
  LUMINOSITY,
  MULTIPLY,
  NORMAL,
  OVERLAY,
  PASSTHROUGH,
  PINLIGHT,
  SATURATION,
  SCREEN,
  SOFTLIGHT,
  SUBTRACT,
  VIVIDLIGHT,
}

/**
 * The number of bits per channel (also called pixel depth or color depth). The
 * number selected indicates the exponent of 2. For example, a pixel with a
 * bit-depth of EIGHT has 28, or 256, possible color values. Used in
 * BMPSaveOptions. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 199
 */
declare enum BMPDepthType {
  BMP_A1R5G5B5,
  BMP_A4R4G4B4,
  BMP_A8R8G8B8,
  BMP_R5G6B5,
  BMP_R8G8B8,
  BMP_X1R5G5B5,
  BMP_X4R4G4B4,
  BMP_X8R8G8B8,
  EIGHT,
  FOUR,
  ONE,
  SIXTEEN,
  THIRTYTWO,
  TWENTYFOUR,
}

/**
 * The platform-specific order in which multibyte values are read.
 */
declare enum ByteOrder {
  IBM,
  MACOS,
}

/**
 * The default CameraRaw settings to use: the camera settings, custom settings,
 * or the settings of the selected image. Set in CameraRAWOpenOptions.
 */
declare enum CameraRAWSettingsType {
  CAMERA,
  CUSTOM,
  SELECTEDIMAGE,
}

/**
 * The camera RAW size type options:. EXTRALARGE=5120 x 4096 LARGE=4096 x 2731
 * MAXIMUM=6144 X 4096 MEDIUM=3072 x 2048 MINIMUM=1536 x 1024 SMALL=2048 x 1365
 * Set in CameraRAWOpenOptions.
 */
declare enum CameraRAWSize {
  EXTRALARGE,
  LARGE,
  MAXIMUM,
  MEDIUM,
  MINIMUM,
  SMALL,
}

/**
 * The new color profile or mode for a document, specified in
 * Document.changeMode(). Note: Color images must be changed to GRAYSCALE mode
 * before you can change them to BITMAP mode.
 */
declare enum ChangeMode {
  BITMAP,
  CMYK,
  GRAYSCALE,
  INDEXEDCOLOR,
  LAB,
  MULTICHANNEL,
  RGB,
}

/**
 * The type of a color channel: COMPONENT: related to document color mode.
 * MASKEDAREA: Alpha channel where color indicates masked area. SELECTEDAREA:
 * Alpha channel where color indicates selected are. SPOTCOLOR: Alpha channel to
 * store a spot color. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 200
 */
declare enum ChannelType {
  COMPONENT,
  MASKEDAREA,
  SELECTEDAREA,
  SPOTCOLOR,
}

/**
 * The way color should be blended in a fill or stroke operation. Pass to
 * PathItem.fillPath(), Selection.fill(), Selection.stroke()
 */
declare enum ColorBlendMode {
  BEHIND,
  CLEAR,
  COLOR,
  COLORBURN,
  COLORDODGE,
  DARKEN,
  DARKERCOLOR,
  DIFFERENCE,
  DISSOLVE,
  EXCLUSION,
  HARDLIGHT,
  HARDMIXBLEND,
  HUE,
  LIGHTEN,
  LIGHTERCOLOR,
  LINEARBURN,
  LINEARDODGE,
  LINEARLIGHT,
  LUMINOSITY,
  MULTIPLY,
  NORMAL,
  OVERLAY,
  PINLIGHT,
  SATURATION,
  SCREEN,
  SOFTLIGHT,
  VIVIDLIGHT,
}

/**
 * The color model to use for a SolidColor.
 */
declare enum ColorModel {
  CMYK,
  GRAYSCALE,
  HSB,
  LAB,
  NONE,
  RGB,
}

/**
 * The preferred color-selection tool, set in Preferences.
 */
declare enum ColorPicker {
  ADOBE,
  APPLE,
  PLUGIN,
  WINDOWS,
}

/**
 * The type of color profile used to manage this document, set in
 * Document.colorProfileType.
 */
declare enum ColorProfileType {
  CUSTOM,
  NONE,
  WORKING,
}

/**
 * The color reduction algorithm option for ExportOptionsSaveForWeb.
 */
declare enum ColorReductionType {
  ADAPTIVE,
  BLACKWHITE,
  CUSTOM,
  GRAYSCALE,
  MACINTOSH,
  PERCEPTUAL,
  RESTRICTIVE,
  SELECTIVE,
  WINDOWS,
}

/**
 * The type of color space to use in CameraRAWOpenOptions.
 */
declare enum ColorSpaceType {
  ADOBERGB,
  COLORMATCHRGB,
  PROPHOTORGB,
  SRGB,
}

/**
 * The copyright status of a document. Used in
 * DocumentPrintSettings.copyrighted. Constant type Values What it means Adobe
 * Photoshop CC JavaScript Scripting Reference Scripting Constants 201
 */
declare enum CopyrightedType {
  COPYRIGHTEDWORK,
  PUBLICDOMAIN,
  UNMARKED,
}

/**
 * The method to use for creating fields. Pass to ArtLayer.applyDeInterlace().
 */
declare enum CreateFields {
  DUPLICATION,
  INTERPOLATION,
}

/**
 * The style to use when cropping a page in a PDF document. Set in
 * PDFOpenOptions.cropPage.
 */
declare enum CropToType {
  ARTBOX,
  BLEEDBOX,
  BOUNDINGBOX,
  CROPBOX,
  MEDIABOX,
  TRIMBOX,
}

/**
 * The type of composite DCS file to create with DCS1_SaveOptions or
 * DCS2_SaveOptions: COLORCOMPOSITE: Creates a color composite file in addition
 * to DCS files. GRAYSCALECOMPOSITE: Creates a grayscale composite file in
 * addition to DCS files. NOCOMPOSITE: Does not create a composite file.
 */
declare enum DCSType {
  COLORCOMPOSITE,
  GRAYSCALECOMPOSITE,
  NOCOMPOSITE,
}

/**
 * The source to use for the depth map. Pass to ArtLayer.applyLensBlur().
 */
declare enum DepthMapSource {
  IMAGEHIGHLIGHT,
  LAYERMASK,
  NONE,
  TRANSPARENCYCHANNEL,
}

/**
 * The value type of an action key, returned by ActionDescriptor.getType() and
 * ActionList.getType().
 */
declare enum DescValueType {
  ALIASTYPE,
  BOOLEANTYPE,
  CLASSTYPE,
  DOUBLETYPE,
  ENUMERATEDTYPE,
  INTEGERTYPE,
  LARGEINTEGERTYPE,
  LISTTYPE,
  OBJECTTYPE,
  RAWTYPE,
  REFERENCETYPE,
  STRINGTYPE,
  UNITDOUBLE,
}

/**
 * Controls the type of dialogs Photoshop displays when running scripts.
 */
declare enum DialogModes {
  ALL,
  ERROR,
  NO,
}

/**
 * ● The direction in which to flip the document canvas, passed to
 * Document.flipCanvas(). ● The orientation of text in TextItem.direction. ● The
 * direction of text warping in TextItem.warpDirection. Constant type Values
 * What it means Adobe Photoshop CC JavaScript Scripting Reference Scripting
 * Constants 202
 */
declare enum Direction {
  HORIZONTAL,
  VERTICAL,
}

/**
 * Describes how the displacement map fits the image if the image is not the
 * same size as the map. Pass to ArtLayer.applyDisplace().
 */
declare enum DisplacementMapType {
  STRETCHTOFIT,
  TILE,
}

/**
 * The type of dithering to use in GIFSaveOptions, IndexedConversionOptions and
 * ExportOptionsSaveForWeb.
 */
declare enum Dither {
  DIFFUSION,
  NOISE,
  NONE,
  PATTERN,
}

/**
 * The type of positioning to use in DocPosition
 */
declare enum DocPositionStyle {
  PRINTCENTERED,
  USERDEFINED,
}

/**
 * The fill type of a new document, passed to Documents.add().
 */
declare enum DocumentFill {
  BACKGROUNDCOLOR,
  TRANSPARENT,
  WHITE,
}

/**
 * The color mode of a open document, Document.mode. See also
 * Document.changeMode().
 */
declare enum DocumentMode {
  BITMAP,
  CMYK,
  DUOTONE,
  GRAYSCALE,
  INDEXEDCOLOR,
  LAB,
  MULTICHANNEL,
  RGB,
}

/**
 * The preferred level of detail in th history log, set in Preferences: CONCISE:
 * Save a concise history log. DETAILED: Save a detailed history log.
 * SESSIONONLY: Save history log only for the session.
 */
declare enum EditLogItemsType {
  CONCISE,
  DETAILED,
  SESSIONONLY,
}

/**
 * The object’s position in the Layers palette. Note: Not all values are valid
 * for all object types. See the specific object description to make sure you
 * are using a valid value.
 */
declare enum ElementPlacement {
  INSIDE,
  PLACEATBEGINNING,
  PLACEATEND,
  PLACEBEFORE,
  PLACEAFTER,
}

/**
 * The type of fields to eliminate. Pass to ArtLayer.applyDeInterlace().
 */
declare enum EliminateFields {
  EVENFIELDS,
  ODDFIELDS,
}

/**
 * The type of export for Document.exportDocument(). This is equivalent to
 * choosing File > Export > Paths To Illustrator, or File > Save For Web and
 * Devices.
 */
declare enum ExportType {
  ILLUSTRATORPATHS,
  SAVEFORWEB,
}

/**
 * The policy and format for appending an extension to the filename when saving
 * with Document.saveAs(). Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 203
 */
declare enum Extension {
  LOWERCASE,
  NONE,
  UPPERCASE,
}

/**
 * File naming options for the BatchOptions used with the Application.batch()
 * method.
 */
declare enum FileNamingType {
  DDMM,
  DDMMYY,
  DOCUMENTNAMELOWER,
  DOCUMENTNAMEMIXED,
  DOCUMENTNAMEUPPER,
  EXTENSIONLOWER,
  EXTENSIONUPPER,
  MMDD,
  MMDDYY,
  SERIALLETTERLOWER,
  SERIALLETTERUPPER,
  SERIALNUMBER1,
  SERIALNUMBER2,
  SERIALNUMBER3,
  SERIALNUMBER4,
  YYDDMM,
  YYMMDD,
  YYYYMMDD,
}

/**
 * The preferred type size to use for font previews in the type tool font menus
 * , set in Preferences.
 */
declare enum FontPreviewType {
  HUGE,
  EXTRALARGE,
  LARGE,
  MEDIUM,
  NONE,
  SMALL,
}

/**
 * The preferred type size to use for panels and dialogs, set in Preferences.
 */
declare enum FontSize {
  LARGE,
  MEDIUM,
  SMALL,
}

/**
 * The type of colors to be included the color table regardless of their usage.
 * Used in GIFSaveOptions and IndexedConversionOptions. BLACKWHITE: Pure black
 * and pure white. NONE: None PRIMARIES: Red, green, blue, cyan, magenta,
 * yellow, black, and white. WEB: the 216 web-safe colors.
 */
declare enum ForcedColors {
  BLACKWHITE,
  NONE,
  PRIMARIES,
  WEB,
}

/**
 * The option with which to save a JPEG file, in JPEGSaveOptions.
 * OPTIMIZEDBASELINE: Optimized color and a slightly reduced file size.
 * PROGRESSIVE: Displays a series of increasingly detailed scans as the image
 * downloads. STANDARDBASELINE: Format recognized by most web browsers.
 */
declare enum FormatOptions {
  OPTIMIZEDBASELINE,
  PROGRESSIVE,
  STANDARDBASELINE,
}

/**
 * The type of proportions to constrain for images. Used in
 * GalleryImagesOptions. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 204
 */
declare enum GalleryConstrainType {
  CONSTRAINBOTH,
  CONSTRAINHEIGHT,
  CONSTRAINWIDTH,
}

/**
 * The fonts to use for the Web photo gallery captions and other text. Used in
 * GalleryBannerOptions, GalleryImagesOptions, and GalleryThumbnailOptions. Also
 * used in PicturePackageOptions.
 */
declare enum GalleryFontType {
  ARIAL,
  COURIERNEW,
  HELVETICA,
  TIMESNEWROMAN,
}

/**
 * The color to use for text displayed over gallery images as an antitheft
 * deterrent. Used in GallerySecurityOptions.
 */
declare enum GallerySecurityTextColorType {
  BLACK,
  CUSTOM,
  WHITE,
}

/**
 * The position of the text displayed over gallery images as an antitheft
 * deterrent. Used in GallerySecurityOptions. Also used in PicturePackageOptions.
 */
declare enum GallerySecurityTextPositionType {
  CENTERED,
  LOWERLEFT,
  LOWERRIGHT,
  UPPERLEFT,
  UPPERRIGHT,
}

/**
 * The orientation of the text displayed over gallery images as an antitheft
 * deterrent. Used in GallerySecurityOptions. Also used in PicturePackageOptions.
 */
declare enum GallerySecurityTextRotateType {
  CLOCKWISE45,
  CLOCKWISE90,
  COUNTERCLOCKWISE45,
  COUNTERCLOCKWISE90,
  ZERO,
}

/**
 * The content to use for text displayed over gallery images as an antitheft
 * deterrent. Used in GallerySecurityOptions. Note: All types draw from the
 * image’s file information except CUSTOMTEXT.
 */
declare enum GallerySecurityType {
  CAPTION,
  COPYRIGHT,
  CREDIT,
  CUSTOMTEXT,
  FILENAME,
  NONE,
  TITLE,
}

/**
 * The size of thumbnail images in the web photo gallery. Used in
 * GalleryThumbnailOptions.
 */
declare enum GalleryThumbSizeType {
  CUSTOM,
  LARGE,
  MEDIUM,
  SMALL,
}

/**
 * Geometric options for shapes, such as the iris shape in the Lens Blur Filter.
 * Pass to ArtLayer.applyLensBlur().
 */
declare enum Geometry {
  HEPTAGON,
  HEXAGON,
  OCTAGON,
  PENTAGON,
  SQUARE,
  TRIANGLE,
}

/**
 * The preferred line style for the nonprinting grid displayed over images, set
 * in Preferences.
 */
declare enum GridLineStyle {
  DASHED,
  DOTTED,
  SOLID,
}

/**
 * The preferred size of grid line spacing, set in Preferences. Constant type
 * Values What it means Adobe Photoshop CC JavaScript Scripting Reference
 * Scripting Constants 205
 */
declare enum GridSize {
  LARGE,
  MEDIUM,
  NONE,
  SMALL,
}

/**
 * The preferred line style for nonprinting guides displayed over images, set in
 * Preferences.
 */
declare enum GuideLineStyle {
  DASHED,
  SOLID,
}

/**
 * The paths to export to an Illustrator file using Document.exportDocument().
 */
declare enum IllustratorPathType {
  ALLPATHS,
  DOCUMENTBOUNDS,
  NAMEDPATH,
}

/**
 * The rendering intent to use when converting from one color space to another
 * with Document.convertProfile() or Document.print()
 */
declare enum Intent {
  ABSOLUTECOLORIMETRIC,
  PERCEPTUAL,
  RELATIVECOLORIMETRIC,
  SATURATION,
}

/**
 * The placement of paragraph text within the bounding box. Used in
 * TextItem.justification.
 */
declare enum Justification {
  CENTER,
  CENTERJUSTIFIED,
  FULLYJUSTIFIED,
  LEFT,
  LEFTJUSTIFIED,
  RIGHT,
  RIGHTJUSTIFIED,
}

/**
 * The language to use for text. Used in TextItem.language.
 */
declare enum Language {
  BRAZILLIANPORTUGUESE,
  CANADIANFRENCH,
  DANISH,
  DUTCH,
  ENGLISHUK,
  ENGLISHUSA,
  FINNISH,
  FRENCH,
  GERMAN,
  ITALIAN,
  NORWEGIAN,
  NYNORSKNORWEGIAN,
  OLDGERMAN,
  PORTUGUESE,
  SPANISH,
  SWEDISH,
  SWISSGERMAN,
}

/**
 * Compression methods for data for pixels in layers, when saving to TIFF
 * format. Used in TiffSaveOptions. Constant type Values What it means Adobe
 * Photoshop CC JavaScript Scripting Reference Scripting Constants 206
 */
declare enum LayerCompression {
  RLE,
  ZIP,
}

/**
 * The type of a layer object, in ArtLayer.kind. Note: You can create a text
 * layer only from an empty art layer.
 */
declare enum LayerKind {
  BLACKANDWHITE,
  BRIGHTNESSCONTRAST,
  CHANNELMIXER,
  COLORBALANCE,
  CURVES,
  EXPOSURE,
  GRADIENTFILL,
  GRADIENTMAP,
  HUESATURATION,
  INVERSION,
  LEVELS,
  NORMAL,
  PATTERNFILL,
  PHOTOFILTER,
  POSTERIZE,
  SELECTIVECOLOR,
  SMARTOBJECT,
  SOLIDFILL,
  TEXT,
  THRESHOLD,
  LAYER3D,
  VIBRANCE,
  VIDEO,
}

/**
 * The type of lens to use. Pass to ArtLayer.applyLensFlare().
 */
declare enum LensType {
  MOVIEPRIME,
  PRIME105,
  PRIME35,
  ZOOMLENS,
}

/**
 * The type of magnification to use when viewing an image. Used in
 * PresentationOptions.
 */
declare enum MagnificationType {
  ACTUALSIZE,
  FITPAGE,
}

/**
 * The color to use to fill anti-aliased edges adjacent to transparent areas of
 * the image. When transparency is turned off for an image, the matte color is
 * applied to transparent areas. Used in GIFSaveOptions,
 * IndexedConversionOptions, and JPEGSaveOptions.
 */
declare enum MatteType {
  BACKGROUND,
  BLACK,
  FOREGROUND,
  NETSCAPE,
  NONE,
  SEMIGRAY,
  WHITE,
}

/**
 * The measurement to act upon. Pass to MeasurementLog methods.
 */
declare enum MeasurementRange {
  ALLMEASUREMENTS,
  ACTIVEMEASUREMENTS,
}

/**
 * The source for recording measurements. Pass to Document.recordMeasurements().
 */
declare enum MeasurementSource {
  MEASURESELECTION,
  MEASURECOUNTTOOL,
  MEASURERULERTOOL,
}

/**
 * The color profile to use for a new document. Pass to Documents.add(). Also
 * used in ContactSheetOptions and PicturePackageOptions. Constant type Values
 * What it means Adobe Photoshop CC JavaScript Scripting Reference Scripting
 * Constants 207
 */
declare enum NewDocumentMode {
  BITMAP,
  CMYK,
  GRAYSCALE,
  LAB,
  RGB,
}

/**
 * Distribution method to use when applying an Add Noise filter. Pass to
 * ArtLayer.applyAddNoise().
 */
declare enum NoiseDistribution {
  GAUSSIAN,
  UNIFORM,
}

/**
 * Method to use to fill the empty space left by offsetting a an image or
 * selection. Pass to ArtLayer.applyOffset().
 */
declare enum OffsetUndefinedAreas {
  REPEATEDGEPIXELS,
  SETTOBACKGROUND,
  WRAPAROUND,
}

/**
 * The color profile to use when opening an EPS or PDF document. Pass to
 * app.open() in EPSOpenOptions or PDFOpenOptions.
 */
declare enum OpenDocumentMode {
  CMYK,
  GRAYSCALE,
  LAB,
  RGB,
}

/**
 * The format in which to open the document, using app.open(). Note: PHOTOCD is
 * deprecated. Kodak PhotoCD is now found in the Goodies folder on the Adobe
 * Photoshop CC Install DVD. Note: The DICOM option is for the Extended version
 * only.
 */
declare enum OpenDocumentType {
  ALIASPIX,
  BMP,
  CAMERARAW,
  COMPUSERVEGIF,
  DICOM,
  ELECTRICIMAGE,
  EPS,
  EPSPICTPREVIEW,
  EPSTIFFPREVIEW,
  FILMSTRIP,
  JPEG,
  PCX,
  PDF,
  PHOTOCD,
  PHOTOSHOP,
  PHOTOSHOPDCS_1,
  PHOTOSHOPDCS_2,
  PHOTOSHOPEPS,
  PHOTOSHOPPDF,
  PICTFILEFORMAT,
  PICTRESOURCEFORMAT,
  PIXAR,
  PNG,
  PORTABLEBITMAP,
  RAW,
  SCITEXCT,
  SGIRGB,
  SOFTIMAGE,
  TARGA,
  TIFF,
  WAVEFRONTRLA,
  WIRELESSBITMAP,
}

/**
 * The target operating system in BMPSaveOptions.
 */
declare enum OperatingSystem {
  OS2,
  WINDOWS,
}

/**
 * Page orientation for PhotoCDOpenOptions, deprecated in Photoshop CS3. Note:
 * Kodak PhotoCD is now found in the Goodies folder on the Adobe Photoshop CC
 * Install DVD. Constant type Values What it means Adobe Photoshop CC JavaScript
 * Scripting Reference Scripting Constants 208
 */
declare enum Orientation {
  LANDSCAPE,
  PORTRAIT,
}

/**
 * The preferred pointer for the following tools: Eraser, Pencil, Paintbrush,
 * Healing Brush, Rubber Stamp, Pattern Stamp, Smudge, Blur, Sharpen, Dodge,
 * Burn, Sponge. Set in Preferences.
 */
declare enum OtherPaintingCursors {
  PRECISEOTHER,
  STANDARDOTHER,
}

/**
 * The preferred pointer for the following tools: Marquee, Lasso, Polygonal
 * Lasso, Magic Wand, Crop, Slice, Patch Eyedropper, Pen, Gradient, Line, Paint
 * Bucket, Magnetic Lasso, Magnetic Pen, Freeform Pen, Measure, Color Sampler.
 * Set in Preferences.
 */
declare enum PaintingCursors {
  BRUSHSIZE,
  PRECISE,
  STANDARD,
}

/**
 * The palette type to use in GIFSaveOptions and IndexedConversionOptions.
 */
declare enum PaletteType {
  EXACT,
  LOCALADAPTIVE,
  LOCALPERCEPTUAL,
  LOCALSELECTIVE,
  MACOSPALETTE,
  MASTERADAPTIVE,
  MASTERPERCEPTUAL,
  MASTERSELECTIVE,
  PREVIOUSPALETTE,
  UNIFORM,
  WEBPALETTE,
  WINDOWSPALETTE,
}

/**
 * The type of a PathItem.
 */
declare enum PathKind {
  CLIPPINGPATH,
  NORMALPATH,
  TEXTMASK,
  VECTORMASK,
  WORKPATH,
}

/**
 * The PDF version to make the document compatible with. Used in PDFSaveOptions.
 */
declare enum PDFCompatibility {
  PDF13,
  PDF14,
  PDF15,
  PDF16,
  PDF17,
}

/**
 * The type of compression to use when saving a document in PDF format. Used in
 * PDFSaveOptions. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 209
 */
declare enum PDFEncoding {
  JPEG,
  JPEG2000HIGH,
  JPEG2000LOSSLESS,
  JPEG2000LOW,
  JPEG2000MED,
  JPEG2000MEDHIGH,
  JPEG2000MEDLOW,
  JPEGHIGH,
  JPEGLOW,
  JPEGMED,
  JPEGMEDHIGH,
  JPEGMEDLOW,
  NONE,
  PDFZIP,
  PDFZIP4BIT,
}

/**
 * The down sample method to use. Used in PDFSaveOptions.
 */
declare enum PDFResample {
  NONE,
  PDFAVERAGE,
  PDFBICUBIC,
  PDFSUBSAMPLE,
}

/**
 * The PDF standard to make the document compatible with. Used in PDFSaveOptions.
 */
declare enum PDFStandard {
  NONE,
  PDFX1A2001,
  PDFX1A2003,
  PDFX32002,
  PDFX32003,
  PDFX42008,
}

/**
 * The color space for PhotoCDOpenOptions, deprecated in Photoshop CS3. Note:
 * Kodak PhotoCD is now found in the Goodies folder on the Adobe Photoshop CC
 * Install DVD.
 */
declare enum PhotoCDColorSpace {
  LAB16,
  LAB8,
  RGB16,
  RGB8,
}

/**
 * The pixel dimensions of the image in PhotoCDOpenOptions, deprecated in
 * Photoshop CS3. EXTRALARGE = 1024x1536 LARGE = 512x768 MAXIMUM = 2048x3072
 * MEDIUM = 256x384 MINIMUM = 64x96 SMALL = 128x192 Note: Kodak PhotoCD is now
 * found in the Goodies folder on the Adobe Photoshop CC Install DVD.
 */
declare enum PhotoCDSize {
  EXTRALARGE,
  LARGE,
  MAXIMUM,
  MEDIUM,
  MINIMUM,
  SMALL,
}

/**
 * The number of bits per pixel to use when compression a PICT file. Used in
 * PICTFileSaveOptions and PICTResourceSaveOptions. Note: Use 16 or 32 for RGB
 * images; use 2, 4, or 8 for bitmap and grayscale images.
 */
declare enum PICTBitsPerPixels {
  EIGHT,
  FOUR,
  SIXTEEN,
  THIRTYTWO,
  TWO,
}

/**
 * The type of compression to use when saving an image as a PICT file. Used in
 * PICTFileSaveOptions and PICTResourceSaveOptions.
 */
declare enum PICTCompression {
  JPEGHIGHPICT,
  JPEGLOWPICT,
  JPEGMAXIMUMPICT,
  JPEGMEDIUMPICT,
  NONE,
}

/**
 * The function or meaning of text in a Picture Package. Used in
 * PicturePackageOptions. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 210
 */
declare enum PicturePackageTextType {
  CAPTION,
  COPYRIGHT,
  CREDIT,
  FILENAME,
  NONE,
  ORIGIN,
  USER,
}

/**
 * The role a PathPoint plays in a PathItem.
 */
declare enum PointKind {
  CORNERPOINT,
  SMOOTHPOINT,
}

/**
 * The preferred measurement to use for type points, set in
 * Preferences.pointSize: POSTSCRIPT = 72 points/inch. TRADITIONAL = 72.27
 * points/inch.
 */
declare enum PointType {
  POSTSCRIPT,
  TRADITIONAL,
}

/**
 * The method of polar distortion to use. Pass to
 * ArtLayer.applyPolarCoordinates().
 */
declare enum PolarConversionType {
  POLARTORECTANGULAR,
  RECTANGULARTOPOLAR,
}

/**
 * The type of image to use as a low-resolution preview in the destination
 * application. Used in DCS1_SaveOptions, DCS2_SaveOptions, and EPSSaveOptions.
 */
declare enum Preview {
  EIGHTBITTIFF,
  MACOSEIGHTBIT,
  MACOSJPEG,
  MACOSMONOCHROME,
  MONOCHROMETIFF,
  NONE,
}

/**
 * The type of color handling to use for ColorHandling
 */
declare enum PrintColorHandling {
  PRINTERMANAGED,
  PHOTOSHOPMANAGED,
  SEPARATIONS,
}

/**
 * Cache to be targeted in an Application.purge() operation.
 */
declare enum PurgeTarget {
  ALLCACHES,
  CLIPBOARDCACHE,
  HISTORYCACHES,
  UNDOCACHES,
}

/**
 * The preferred policy for checking whether to maximize compatibility when
 * opening PSD files, set in Preferences.maximizeCompatibility.
 */
declare enum QueryStateType {
  ALWAYS,
  ASK,
  NEVER,
}

/**
 * The blur method to use. Pass to ArtLayer.applyRadialBlur().
 */
declare enum RadialBlurMethod {
  SPIN,
  ZOOM,
}

/**
 * The smoothness or graininess of the blurred image. Pass to
 * ArtLayer.applyRadialBlur().
 */
declare enum RadialBlurQuality {
  BEST,
  DRAFT,
  GOOD,
}

/**
 * The layer element to rasterize, using ArtLayer.rasterize().
 */
declare enum RasterizeType {
  ENTIRELAYER,
  FILLCONTENT,
  LAYERCLIPPINGPATH,
  LINKEDLAYERS,
  SHAPE,
  TEXTCONTENTS,
}

/**
 * The type of an ActionReference object, returned by getForm(). Constant type
 * Values What it means Adobe Photoshop CC JavaScript Scripting Reference
 * Scripting Constants 211
 */
declare enum ReferenceFormType {
  CLASSTYPE,
  ENUMERATED,
  IDENTIFIER,
  INDEX,
  NAME,
  OFFSET,
  PROPERTY,
}

/**
 * The method to use for image interpolation. Passed to Document.resizeImage(),
 * and used as the value of Preferences.interpolation.
 */
declare enum ResampleMethod {
  AUTOMATIC,
  BICUBIC,
  BICUBICAUTOMATIC,
  BICUBICSHARPER,
  BICUBICSMOOTHER,
  BILINEAR,
  NEARESTNEIGHBOR,
  NONE,
  PRESERVEDETAILS,
}

/**
 * The size of undulations to use. Pass to ArtLayer.applyRipple().
 */
declare enum RippleSize {
  LARGE,
  MEDIUM,
  SMALL,
}

/**
 * The application’s preferred behavior when saving a document. See
 * Preferences.appendExtension and imagePreviews
 */
declare enum SaveBehavior {
  ALWAYSSAVE,
  ASKWHENSAVING,
  NEVERSAVE,
}

/**
 * The format in which to save a document when exporting with
 * Document.exportDocument(). Pass in ExportOptionsSaveForWeb.format, to to
 * specify the type of file to write. Only the following are supported for
 * export: COMPUSERVEGIF, JPEG, PNG-8, PNG-24, and BMP.
 */
declare enum SaveDocumentType {
  ALIASPIX,
  BMP,
  COMPUSERVEGIF,
  ELECTRICIMAGE,
  JPEG,
  PCX,
  PHOTOSHOP,
  PHOTOSHOPDCS_1,
  PHOTOSHOPDCS_2,
  PHOTOSHOPEPS,
  PHOTOSHOPPDF,
  PICTFILEFORMAT,
  PICTRESOURCEFORMAT,
  PIXAR,
  PNG,
  PORTABLEBITMAP,
  RAW,
  SCITEXCT,
  SGIRGB,
  SOFTIMAGE,
  TARGA,
  TIFF,
  WAVEFRONTRLA,
  WIRELESSBITMAP,
}

/**
 * The type of encoding to use when saving a file to DCS or EPS with
 * Document.saveAs().
 */
declare enum SaveEncoding {
  ASCII,
  BINARY,
  JPEGHIGH,
  JPEGLOW,
  JPEGMAXIMUM,
  JPEGMEDIUM,
}

/**
 * The preferred location of history log data, set in Preferences.saveLogItems.
 */
declare enum SaveLogItemsType {
  LOGFILE,
  LOGFILEANDMETADATA,
  METADATA,
}

/**
 * The policy for closing a document with Document.close(). Constant type Values
 * What it means Adobe Photoshop CC JavaScript Scripting Reference Scripting
 * Constants 212
 */
declare enum SaveOptions {
  DONOTSAVECHANGES,
  PROMPTTOSAVECHANGES,
  SAVECHANGES,
}

/**
 * The selection behavior when a selection already exists: DIMINISH: Remove the
 * selection from the already selected area. EXTEND: Add the selection to an
 * already selected area. INTERSECT: Make the selection only the area where the
 * new selection intersects the already selected area. REPLACE: Replace the
 * selected area. Used in PathItem.makeSelection(), Selection.load(),
 * Selection.select(), and Selection.store().
 */
declare enum SelectionType {
  DIMINISH,
  EXTEND,
  INTERSECT,
  REPLACE,
}

/**
 * How to combine the shapes if the destination path already has a selection.
 * Set for SubPathInfo.operation, stored in the resulting SubPathItem.
 */
declare enum ShapeOperation {
  SHAPEADD,
  SHAPEINTERSECT,
  SHAPESUBTRACT,
  SHAPEXOR,
}

/**
 * The method to use for smart blurring: EDGEONLY, OVERLAYEDGES: Apply blur only
 * to edges of color transitions. NORMAL: Apply blur to entire image. Pass to
 * ArtLayer.applySmartBlur().
 */
declare enum SmartBlurMode {
  EDGEONLY,
  NORMAL,
  OVERLAYEDGE,
}

/**
 * The blur quality to use. Pass to ArtLayer.applySmartBlur().
 */
declare enum SmartBlurQuality {
  HIGH,
  LOW,
  MEDIUM,
}

/**
 * The color space for source when printing with Document.print().
 */
declare enum SourceSpaceType {
  DOCUMENT,
  PROOF,
}

/**
 * The curve (or stretch shape) to use for the distortion. Pass to
 * ArtLayer.applySpherize().
 */
declare enum SpherizeMode {
  HORIZONTAL,
  NORMAL,
  VERTICAL,
}

/**
 * The style of strikethrough to use in text. Used in TextItem.strikeThru.
 */
declare enum StrikeThruType {
  STRIKEBOX,
  STRIKEHEIGHT,
  STRIKEOFF,
}

/**
 * The placement of path or selection boundary strokes. Pass to
 * Selection.stroke().
 */
declare enum StrokeLocation {
  CENTER,
  INSIDE,
  OUTSIDE,
}

/**
 * The resolution to use when saving an image in Targa format. Used in
 * TargaSaveOptions. Constant type Values What it means Adobe Photoshop CC
 * JavaScript Scripting Reference Scripting Constants 213
 */
declare enum TargaBitsPerPixels {
  SIXTEEN,
  THIRTYTWO,
  TWENTYFOUR,
}

/**
 * The capitalization style to use in text. Used in TextItem.capitalization.
 */
declare enum TextCase {
  ALLCAPS,
  NORMAL,
  SMALLCAPS,
}

/**
 * The composition method to use to optimize the specified hyphenation and
 * justification options. Used in TextItem.textComposer.
 */
declare enum TextComposer {
  ADOBEEVERYLINE,
  ADOBESINGLELINE,
}

/**
 * The type of text, used in TextItem.kind. PARAGRAPHTEXT: Text that wraps
 * within a bounding box. POINTTEXT: Text that does not wrap.
 */
declare enum TextType {
  PARAGRAPHTEXT,
  POINTTEXT,
}

/**
 * The type of texture or glass surface image to load for a texturizer or glass
 * filter. Pass to ArtLayer.applyGlassEffect().
 */
declare enum TextureType {
  BLOCKS,
  CANVAS,
  FILE,
  FROSTED,
  TINYLENS,
}

/**
 * The type of compression to use for TIFF files. Used in TiffSaveOptions.
 */
declare enum TIFFEncoding {
  JPEG,
  NONE,
  TIFFLZW,
  TIFFZIP,
}

/**
 * The tool to use with PathItem.strokePath().
 */
declare enum ToolType {
  ARTHISTORYBRUSH,
  BACKGROUNDERASER,
  BLUR,
  BRUSH,
  BURN,
  CLONESTAMP,
  COLORREPLACEMENTTOOL,
  DODGE,
  ERASER,
  HEALINGBRUSH,
  HISTORYBRUSH,
  PATTERNSTAMP,
  PENCIL,
  SHARPEN,
  SMUDGE,
  SPONGE,
}

/**
 * The method to use for transition from one image to the next in a PDF
 * presentation. Used in PresentationOptions. Constant type Values What it means
 * Adobe Photoshop CC JavaScript Scripting Reference Scripting Constants 214
 */
declare enum TransitionType {
  BLINDSHORIZONTAL,
  BLINDSVERTICAL,
  BOXIN,
  BOXOUT,
  DISSOLVE,
  GLITTERDOWN,
  GLITTERRIGHT,
  GLITTERRIGHTDOWN,
  NONE,
  RANDOM,
  SPLITHORIZONTALIN,
  SPLITHORIZONTALOUT,
  SPLITVERTICALIN,
  SPLITVERTICALOUT,
  WIPEDOWN,
  WIPELEFT,
  WIPERIGHT,
  WIPEUP,
}

/**
 * Type of pixels to trim around an image, passed to Document.trim().:
 * BOTTOMRIGHT = bottom right pixel color. TOPLEFT = top left pixel color.
 */
declare enum TrimType {
  BOTTOMRIGHT,
  TOPLEFT,
  TRANSPARENT,
}

/**
 * The preferred unit for text character measurements, set in Preferences.
 */
declare enum TypeUnits {
  MM,
  PIXELS,
  POINTS,
}

/**
 * The method to use to treat undistorted areas or areas left blank in an image
 * to which the a filter in the Distort category has been applied. Pass to
 * ArtLayer.applyDisplace(), applyShear(), applyWave().
 */
declare enum UndefinedAreas {
  REPEATEDGEPIXELS,
  WRAPAROUND,
}

/**
 * The placement of text underlining. Used in TextItem.underline. Note:
 * UNDERLINELEFT and UNDELINERIGHT are valid only when direction =
 * Direction.VERTICAL.
 */
declare enum UnderlineType {
  UNDERLINELEFT,
  UNDERLINEOFF,
  UNDERLINERIGHT,
}

/**
 * The preferred measurement unit for type and ruler increments, set in
 * Preferences.rulerUnits.
 */
declare enum Units {
  CM,
  INCHES,
  MM,
  PERCENT,
  PICAS,
  PIXELS,
  POINTS,
}

/**
 * The editorial urgency status of a document, set in
 * DocumentPrintSettings.urgency.
 */
declare enum Urgency {
  FOUR,
  HIGH,
  LOW,
  NONE,
  NORMAL,
  SEVEN,
  SIX,
  THREE,
  TWO,
}

/**
 * The warp style to use for text. Used in TextItem.warpStyle. Constant type
 * Values What it means Adobe Photoshop CC JavaScript Scripting Reference
 * Scripting Constants 215
 */
declare enum WarpStyle {
  ARC,
  ARCH,
  ARCLOWER,
  ARCUPPER,
  BULGE,
  FISH,
  FISHEYE,
  FLAG,
  INFLATE,
  NONE,
  RISE,
  SHELLLOWER,
  SHELLUPPER,
  SQUEEZE,
  TWIST,
  WAVE,
}

/**
 * The type of wave to use. Pass to ArtLayer.applyWave().
 */
declare enum WaveType {
  SINE,
  SQUARE,
  TRIANGULAR,
}

/**
 * Lighting conditions that affect color balance. Set in CameraRAWOpenOptions.
 */
declare enum WhiteBalanceType {
  ASSHOT,
  AUTO,
  CLOUDY,
  CUSTOM,
  DAYLIGHT,
  FLASH,
  FLUORESCENT,
  SHADE,
  TUNGSTEN,
}

/**
 * The method of zigzagging to use. Pass to ArtLayer.applyZigZag().
 */
declare enum ZigZagType {
  AROUNDCENTER,
  OUTFROMCENTER,
  PONDRIPPLES,
}
////////////////////////////////////////////////////////////////////////////////
//
// This file was generated. Do not modify.
//
////////////////////////////////////////////////////////////////////////////////

/// <reference path="ps.constants.d.ts" />

declare class ActionDescriptor {
  /**
   * The number of keys contained in the descriptor.
   */
  readonly count: number

  /**
   * The class name of the referenced actionDescriptor object.
   */
  readonly typename: string

  /**
   * Clears the descriptor.
   */
  clear(): void

  /**
   * Erases a key from the descriptor.
   */
  erase(key: number): void

  /**
   * Creates a descriptor from a stream of bytes; for reading from disk.
   */
  fromStream(value: string): void

  /**
   * Gets the value of a key of type boolean.
   */
  getBoolean(key: number): boolean

  /**
   * Gets the value of a key of type class.
   */
  getClass(key: number): number

  /**
   * Gets raw byte data as a string value.
   */
  getData(key: number): string

  /**
   * Gets the value of a key of type double.
   */
  getDouble(key: number): number

  /**
   * Gets the enumeration type of a key.
   */
  getEnumerationType(key: number): number

  /**
   * Gets the enumeration value of a key.
   */
  getEnumerationValue(key: number): number

  /**
   * Gets the value of a key of type integer.
   */
  getInteger(key: number): number

  /**
   * Gets the ID of the Nth key, provided by index.
   */
  getKey(index: number): number

  /**
   * Gets the value of a key of type large integer.
   */
  getLargeInteger(key: number): number

  /**
   * Gets the value of a key of type list.
   */
  getList(key: number): ActionList

  /**
   * Gets the class ID of an object in a key of type object.
   */
  getObjectType(key: number): number

  /**
   * Gets the value of a key of type object.
   */
  getObjectValue(key: number): ActionDescriptor

  /**
   * Gets the value of a key of type File.
   */
  getPath(key: number): File

  /**
   * Gets the value of a key of type ActionReference.
   */
  getReference(key: number): ActionReference

  /**
   * Gets the value of a key of type string.
   */
  getString(key: number): string

  /**
   * Gets the type of a key.
   */
  getType(key: number): DescValueType

  /**
   * Gets the unit type of a key of type UnitDouble.
   */
  getUnitDoubleType(key: number): number

  /**
   * Gets the value of a key of type UnitDouble.
   */
  getUnitDoubleValue(key: number): number

  /**
   * Checks whether the descriptor contains the provided key.
   */
  hasKey(key: number): boolean

  /**
   * Determines whether the descriptor is the same as another descriptor.
   */
  isEqual(otherDesc: ActionDescriptor): boolean

  /**
   * Sets the value for a key whose type is boolean.
   */
  putBoolean(key: number, value: boolean): void

  /**
   * Sets the value for a key whose type is class.
   */
  putClass(key: number, value: number): void

  /**
   * Puts raw byte data as a string value.
   */
  putData(key: number, value: string): void

  /**
   * Sets the value for a key whose type is double.
   */
  putDouble(key: number, value: number): void

  /**
   * Sets the enumeration type and value for a key.
   */
  putEnumerated(key: number, enumType: number, value: number): void

  /**
   * Sets the value for a key whose type is integer.
   */
  putInteger(key: number, value: number): void

  /**
   * Sets the value for a key whose type is large integer.
   */
  putLargeInteger(key: number, value: number): void

  /**
   * Sets the value for a key whose type is an ActionList object.
   */
  putList(key: number, value: ActionList): void

  /**
   * Sets the value for a key whose type is an object, represented by an
   * Action Descriptor.
   */
  putObject(key: number, classID: number, value: ActionDescriptor): void

  /**
   * Sets the value for a key whose type is path.
   */
  putPath(key: number, value: File): void

  /**
   * Sets the value for a key whose type is an object reference.
   */
  putReference(key: number, value: ActionReference): void

  /**
   * Sets the value for a key whose type is string.
   */
  putString(key: number, value: string): void

  /**
   * Sets the value for a key whose type is a unit value formatted as a double.
   */
  putUnitDouble(key: number, unitID: number, value: number): void

  /**
   * Gets the entire descriptor as a stream of bytes, for writing to disk.
   */
  toStream(): string
}

declare class ActionList {
  /**
   * The number of commands that comprise the action.
   */
  readonly count: number

  /**
   * The class name of the referenced ActionList object.
   */
  readonly typename: string

  /**
   * Clears the list.
   */
  clear(): void

  /**
   * Gets the value of a list element of type boolean.
   */
  getBoolean(index: number): boolean

  /**
   * Gets the value of a list element of type class.
   */
  getClass(index: number): number

  /**
   * Gets raw byte data as a string value.
   */
  getData(index: number): string

  /**
   * Gets the value of a list element of type double.
   */
  getDouble(index: number): number

  /**
   * Gets the enumeration type of a list element.
   */
  getEnumerationType(index: number): number

  /**
   * Gets the enumeration value of a list element.
   */
  getEnumerationValue(index: number): number

  /**
   * Gets the value of a list element of type integer.
   */
  getInteger(index: number): number

  /**
   * Gets the value of a list element of type large integer.
   */
  getLargeInteger(index: number): number

  /**
   * Gets the value of a list element of type list.
   */
  getList(index: number): ActionList

  /**
   * Gets the class ID of a list element of type object.
   */
  getObjectType(index: number): number

  /**
   * Gets the value of a list element of type object.
   */
  getObjectValue(index: number): ActionDescriptor

  /**
   * Gets the value of a list element of type File.
   */
  getPath(index: number): File

  /**
   * Gets the value of a list element of type ActionReference.
   */
  getReference(index: number): ActionReference

  /**
   * Gets the value of a list element of type string.
   */
  getString(index: number): string

  /**
   * Gets the type of a list element.
   */
  getType(index: number): DescValueType

  /**
   * Gets the unit value type of a list element of type Double.
   */
  getUnitDoubleType(index: number): number

  /**
   * Gets the unit value of a list element of type double.
   */
  getUnitDoubleValue(index: number): number

  /**
   * Appends a new value, true or false.
   */
  putBoolean(value: boolean): void

  /**
   * Appends a new value, a class or data type.
   */
  putClass(value: number): void

  /**
   * Appends a new value, a string containing raw byte data.
   */
  putData(value: string): void

  /**
   * Appends a new value, a double.
   */
  putDouble(value: number): void

  /**
   * Appends a new value, an enumerated (constant) value.
   */
  putEnumerated(enumType: number, value: number): void

  /**
   * Appends a new value, an integer.
   */
  putInteger(value: number): void

  /**
   * Appends a new value, a large integer.
   */
  putLargeInteger(value: number): void

  /**
   * Appends a new value, a nested action list.
   */
  putList(value: ActionList): void

  /**
   * Appends a new value, an object.
   */
  putObject(classID: number, value: ActionDescriptor): void

  /**
   * Appends a new value, a path.
   */
  putPath(value: File): void

  /**
   * Appends a new value, a reference to an object created in the script.
   */
  putReference(value: ActionReference): void

  /**
   * Appends a new value, a string.
   */
  putString(value: string): void

  /**
   * Appends a new value, a unit/value pair.
   */
  putUnitDouble(classID: number, value: number): void
}

declare class ActionReference {
  /**
   * The class name of the referenced Action object.
   */
  readonly typename: string

  /**
   * Gets a reference contained in this reference. Container references
   * provide additional pieces to the reference. This looks like another
   * reference, but it is actually part of the same reference.
   */
  getContainer(): ActionReference

  /**
   * Gets a number representing the class of the object.
   */
  getDesiredClass(): number

  /**
   * Gets the enumeration type.
   */
  getEnumeratedType(): number

  /**
   * Gets the enumeration value.
   */
  getEnumeratedValue(): number

  /**
   * Gets the form of this action reference.
   */
  getForm(): ReferenceFormType

  /**
   * Gets the identifier value for a reference whose form is identifier.
   */
  getIdentifier(): number

  /**
   * Gets the index value for a reference in a list or array.
   */
  getIndex(id?: number): number

  /**
   * Gets the name of a reference.
   */
  getName(): string

  /**
   * Gets the offset of the object’s index value.
   */
  getOffset(): number

  /**
   * Gets the property ID value.
   */
  getProperty(): number

  /**
   * Puts a new class form and class type into the reference.
   */
  putClass(desiredClass: number): void

  /**
   * Puts an enumeration type and ID into a reference along with the desired
   * class for the reference.
   */
  putEnumerated(desiredClass: number, enumType: number, value: number): void

  /**
   * Puts a new identifier and value into the reference.
   */
  putIdentifier(desiredClass: number, value: number): void

  /**
   * Puts a new index and value into the reference.
   */
  putIndex(desiredClass: number, value: number): void

  /**
   * Puts a new name and value into the reference.
   */
  putName(desiredClass: number, value: string): void

  /**
   * Puts a new offset and value into the reference.
   */
  putOffset(desiredClass: number, value: number): void

  /**
   * Puts a new property and value into the reference.
   */
  putProperty(desiredClass: number, value: number): void
}

interface Application {
  /**
   * The frontmost document. Setting this property is equivalent to clicking
   * an open document in the Adobe Photoshop CC application to bring it to the
   * front of the screen. Tip: If there is no open document, accessing this
   * property throws an exception.
   */
  activeDocument: Document

  /**
   * The default background color and color style for documents.
   */
  backgroundColor: SolidColor

  /**
   * Information about the application.
   */
  readonly build: string

  /**
   * The name of the current color settings, as selected with Edit > Color
   * Settings.
   */
  colorSettings: string

  /**
   * The dialog mode for the application, which controls what types of
   * dialogs should be displayed when running scripts.
   */
  displayDialogs: DialogModes

  /**
   * The collection of open documents. This is the primary point of access
   * for documents that are currently open in the application. The array
   * allows you to access any open document, or to iterate through all open
   * documents.
   */
  readonly documents: Documents

  /**
   * The fonts installed on this system.
   */
  readonly fonts: TextFonts

  /**
   * The default foreground color (used to paint, fill, and stroke
   * selections).
   */
  foregroundColor: SolidColor

  /**
   * The amount of unused memory available to Adobe Photoshop CC.
   */
  readonly freeMemory: number

  /**
   * The language location of the application. An Adobe locale code consists
   * of a 2-letter ISO-639 language code and an optional 2-letter ISO 3166
   * country code separated by an underscore. Case is significant. For
   * example, en_US, en_UK, ja_JP, de_DE, fr_FR.
   */
  readonly locale: string

  /**
   * A list of file image types Adobe Photoshop CC can open.
   */
  readonly macintoshFileTypes: string[]

  /**
   * The log of measurements taken.
   */
  readonly measurementLog: MeasurementLog

  /**
   * The application's name.
   */
  readonly name: string

  /**
   * The collection of notifiers currently configured (in the Scripts Events
   * Manager menu in the Adobe Photoshop CC application).
   */
  readonly notifiers: Notifiers

  /**
   * True if all notifiers are enabled.
   */
  notifiersEnabled: boolean

  /**
   * The full path to the location of the Adobe Photoshop CC application.
   */
  readonly path: File

  /**
   * The dialog mode for playback mode, which controls what types of dialog
   * to display when playing back a recorded action with the Actions palette.
   */
  playbackDisplayDialogs: DialogModes

  /**
   * Stores and retrieves parameters used as part of a recorded action. Can
   * be used, for example, to control playback speed.
   */
  playbackParameters: ActionDescriptor

  /**
   * The application preference settings (equivalent to selecting Edit >
   * Preferences in the Adobe Photoshop CC application in Windows or Photoshop
   * > Preferences in Mac OS).
   */
  readonly preferences: Preferences

  /**
   * The full path to the Preferences folder.
   */
  readonly preferencesFolder: File

  /**
   * Files in the Recent Files list.
   */
  readonly recentFiles: File[]

  /**
   * The build date of the Scripting interface.
   */
  readonly scriptingBuildDate: string

  /**
   * The version of the Scripting interface.
   */
  readonly scriptingVersion: string

  /**
   * Runtime details of the application and system.
   */
  readonly systemInformation: string

  /**
   * The class name of the referenced app object. Methods
   */
  readonly typename: string

  /**
   * The version of Adobe Photoshop application you are running.
   */
  readonly version: string

  /**
   * A list of file image extensions Adobe Photoshop CC can open.
   */
  readonly windowsFileTypes: string[]

  /**
   * Runs the batch automation routine (similar to the File > Automate > Batch
   * command). The inputFiles parameter specifies the sources for the files to
   * be manipulated by the batch command.
   */
  batch(inputFiles: File[], action: string, from: string, options?: BatchOptions): string

  /**
   * Causes a "beep" sound.
   */
  beep(): void

  /**
   * Makes Adobe Photoshop CC the active (front-most) application.
   */
  bringToFront(): void

  /**
   * Converts from a four character code (character ID) to a runtime ID.
   */
  charIDToTypeID(charID: string): number

  /**
   * Plays an action from the Actions palette. The action parameter is the
   * name of the action, the from parameter is the name of the action set.
   */
  doAction(action: string, from: string): void

  /**
   * Erases the user object with specified ID value from the Photoshop
   * registry.
   */
  eraseCustomOptions(key: string): void

  /**
   * Plays an Action Manager event.
   */
  executeAction(eventID: number, descriptor?: ActionDescriptor, displayDialogs?: DialogModes): ActionDescriptor

  /**
   * Obtains information about a predefined or recorded action.
   */
  executeActionGet(reference: ActionReference): ActionDescriptor

  /**
   * Determines whether the feature specified by name is enabled. The
   * following features are supported as values for name: "photoshop/extended"
   * "photoshop/standard" "photoshop/trial"
   */
  featureEnabled(name: string): boolean

  /**
   * Retreives user objects in the Photoshop registry for the ID with value
   * key.
   */
  getCustomOptions(key: string): ActionDescriptor

  /**
   * Returns true if Quicktime is installed.
   */
  isQuicktimeAvailable(): boolean

  /**
   * Loads a support file (as opposed to a Photoshop image document) from the
   * specified location.
   */
  load(document: File): void

  /**
   * DEPRECATED for Adobe Photoshop CS4.
   */
  makeContactSheet(inputFiles: File[], options?: ContactSheetOptions): string

  /**
   * DEPRECATED for Adobe Photoshop CS4.
   */
  makePDFPresentation(inputFiles: File[], outputFiles: File, options?: PresentationOptions): string

  /**
   * DEPRECATED for Adobe Photoshop CS4.
   */
  makePhotoGallery(inputFolder: File, outputFolder: File, options?: GalleryOptions): string

  /**
   * DEPRECATED for Adobe Photoshop CC. Use provided script:
   * runphotomergeFromScript = true; $.evalFile( app.path +
   * "Presets/Scripts/Photomerge.jsx") photomerge.createPanorama( fileList,
   * displayDialog ); Merges multiple files into one, with user interaction
   * required.
   */
  makePhotomerge(inputFiles: File[]): string

  /**
   * DEPRECATED for Adobe Photoshop CS4.
   */
  makePicturePackage(inputFiles: File[], options?: PicturePackageOptions): string

  /**
   * Opens the specified document. Use the optional as parameter to specify
   * the file format using the constants in OpenDocumentType; or, you can
   * specify a file format together with its open options using these objects:
   * CameraRAWOpenOptions DICOMOpenOptions EPSOpenOptions PDFOpenOptions
   * PhotoCDOpenOptions RawFormatOpenOptions Use the optional parameter
   * asSmartObject (default: false) to create a smart object around the opened
   * document. See the Application sample scripts for an example of using the
   * File object in the open method.
   */
  open(document: File, as?: any, asSmartObject?: boolean): Document
  open(document: File, as?: OpenDocumentType, asSmartObject?: boolean): Document

  /**
   * Invokes the Photoshop Open dialog box for the user to select files.
   * Returns an array of File objects for the files selected in the dialog.
   */
  openDialog(): File[]

  /**
   * Purges one or more caches.
   */
  purge(target: PurgeTarget): void

  /**
   * Saves a customized settings object in the Photoshop registry. key is the
   * unique identifier for your custom settings. customObject is the object to
   * save in the registry. persistent indicates whether the object should
   * persist once the script has finished.
   */
  putCustomOptions(key: string, customObject: ActionDescriptor, persistent?: boolean): void

  /**
   * Pauses the script while the application refreshes. Use to slow down
   * execution and show the results to the user as the script runs. Use
   * carefully; your script runs much more slowly when using this method.
   */
  refresh(): void

  /**
   * Force the font list to get updated.
   */
  refreshFonts(): void

  /**
   * Run a menu item given the menu ID.
   */
  runMenuItem(menuID: number): void

  /**
   * Returns false if dialog is cancelled, true otherwise.
   */
  showColorPicker(): boolean

  /**
   * Converts from a string ID to a runtime ID.
   */
  stringIDToTypeID(stringID: string): number

  /**
   * Toggle palette visibility.
   */
  togglePalettes(): void

  /**
   * Converts from a runtime ID to a character ID.
   */
  typeIDToCharID(typeID: number): string

  /**
   * Converts from a runtime ID to a string ID.
   */
  typeIDToStringID(typeID: number): string
}

interface LayerCommon {
  id: number
  itemIndex: number

  /**
   * The layers linked to this layer. See ArtLayer.link.
   */
  readonly linkedLayers: ArtLayer[]
}

interface ArtLayer extends LayerCommon {
  /**
   * True to completely lock the contents and settings of this layer.
   */
  allLocked: boolean

  /**
   * The blending mode.
   */
  blendMode: BlendMode

  /**
   * An array of coordinates that describes the bounding rectangle of the
   * layer.
   */
  readonly bounds: UnitValue[]

  /**
   * An array of coordinates that describes the bounding rectangle of the
   * layer not including effects.
   */
  readonly boundsNoEffects: UnitValue[]

  /**
   * The interior opacity of the layer, a percentage value.
   */
  fillOpacity: number

  /**
   * The density of the filter mask (between 0.0 and 250.0)
   */
  filterMaskDensity: number

  /**
   * The feather of the filter mask (between 0.0 and 250.0)
   */
  filterMaskFeather: number

  /**
   * True if this layer is grouped with the layer beneath it.
   */
  grouped: boolean

  /**
   * True if this is the background layer of the document. A document can
   * have only one background layer. If there is no background layer, setting
   * this to true causes this to become the background layer.
   */
  isBackgroundLayer: boolean

  /**
   * Sets the type (such as 'text layer') for an empty layer. Valid only when
   * the layer is empty and when isBackgroundLayer is false. See
   * isBackgroundLayer. You can use the kind property to make a background
   * layer a normal layer; however, to make a layer a background layer, you
   * must set isBackgroundLayer to true.
   */
  kind: LayerKind

  /**
   * The density of the layer mask (between 0.0 and 100.0)
   */
  layerMaskDensity: number

  /**
   * The feather of the layer mask (between 0.0 and 250.0)
   */
  layerMaskFeather: number

  /**
   * The name.
   */
  name: string

  /**
   * The master opacity of the layer, a percentage value.
   */
  opacity: number

  /**
   * The object's container.
   */
  readonly parent: Document

  /**
   * True if the pixels in the layer’s image cannot be edited using the
   * paintbrush tool.
   */
  pixelsLocked: boolean

  /**
   * True if the pixels in the layer’s image cannot be moved within the layer.
   */
  positionLocked: boolean

  /**
   * The text item that is associated with the layer. Valid only when kind =
   * LayerKind.TEXT.
   */
  readonly textItem: TextItem

  /**
   * True if editing is confined to the opaque portions of the layer.
   */
  transparentPixelsLocked: boolean

  /**
   * The class name of the referenced artLayer object.
   */
  readonly typename: string

  /**
   * The density of the vector mask (between 0.0 and 250.0)
   */
  vectorMaskDensity: number

  /**
   * The feather of the vector mask (between 0.0 and 250.0)
   */
  vectorMaskFeather: number

  /**
   * True if the layer is visible.
   */
  visible: boolean

  /**
   * Metadata for the layer. Methods
   */
  xmpMetadata: xmpMetadata

  /**
   * Adjusts the brightness in the range [-100..100] and contrast [-100..100].
   */
  adjustBrightnessContrast(brightness: number, contrast: number): void

  /**
   * Adjusts the color balance of the layer’s component channels. For shadows,
   * midtones, and highlights, the array must include three values in the
   * range [-100..100], which represent cyan or red, magenta or green, and
   * yellow or blue, when the document mode is CMYK or RGB. See Document.mode.
   */
  adjustColorBalance(shadows?: number[], midtones?: number[], highlights?: number[], preserveLuminosity?: boolean): void

  /**
   * Adjusts the tonal range of the selected channel using up to fourteen
   * points. Each value in the curveShape array is a point pair, an array of
   * an x and y integer value.
   */
  adjustCurves(curveShape: number[][]): void

  /**
   * Adjusts the levels of the selected channels
   */
  adjustLevels(
    inputRangeStart: number,
    inputRangeEnd: number,
    inputRangeGamma: number,
    outputRangeStart: number,
    outputRangeEnd: number,
  ): void

  /**
   * Applies the Add Noise filter amount is a percentage value.
   */
  applyAddNoise(amount: number, distribution: NoiseDistribution, monochromatic: boolean): void

  /**
   * Applies the Average filter.
   */
  applyAverage(): void

  /**
   * Applies the Blur filter.
   */
  applyBlur(): void

  /**
   * Applies the Blur More filter.
   */
  applyBlurMore(): void

  /**
   * Applies the Clouds filter.
   */
  applyClouds(): void

  /**
   * Applies a custom filter. The characteristics array has 25 members. See
   * Adobe Photoshop CC Help for specific instructions.
   */
  applyCustomFilter(characteristics: number[], scale: number, offset: number): void

  /**
   * Applies the De-Interlace filter.
   */
  applyDeInterlace(eliminateFields: EliminateFields, createFields: CreateFields): void

  /**
   * Applies the Despeckle filter.
   */
  applyDespeckle(): void

  /**
   * Applies the Difference Clouds filter.
   */
  applyDifferenceClouds(): void

  /**
   * Applies the Diffuse Glow filter.
   */
  applyDiffuseGlow(graininess: number, glowAmount: number, clearAmount: number): void

  /**
   * Applies the Displace filter using the specified horizontal and vertical
   * scale, mapping type, treatment of undistorted areas, and path to the
   * distortion image map.
   */
  applyDisplace(
    horizontalScale: number,
    verticalScale: number,
    displacement: DisplacementMapType,
    undefinedareas: UndefinedAreas,
    displacementMapFiles: File,
  ): void

  /**
   * Applies the Dust & Scratches filter.
   */
  applyDustAndScratches(radius: number, threshold: number): void

  /**
   * Applies the Gaussian Blur filter within the specified radius (in pixels)
   */
  applyGaussianBlur(radius: number): void

  /**
   * Applies the Glass filter. scaling is a percentage value.
   */
  applyGlassEffect(
    distortion: number,
    smoothness: number,
    scaling: number,
    invert?: boolean,
    texture?: TextureType,
    textureFile?: File,
  ): void

  /**
   * Applies the High Pass filter within the specified radius.
   */
  applyHighPass(radius: number): void

  /**
   * Applies the Lens Blur filter. source: The source for the depth map
   * (default: DepthMapSource.NONE) focalDistance : The blur focal distance
   * for the depth map (default: 0). invertDepthMask : True if the depth map
   * is inverted (default: false). shape: The shape of the iris (default:
   * Geometry.HEXAGON) radius: The radius of the iris (default: 15).
   * bladeCurvature: The blade curvature of the iris (default: 0). rotation:
   * The rotation of the iris (default: 0) brightness: The brightness for the
   * specular highlights (default: 0). threshold: The threshold for the
   * specular highlights (default: 0). amount: The amount of noise (default:
   * 0) distribution: The distribution value for the noise (default:
   * NoiseDistribution.UNIFORM). monochromatic: True if the noise is
   * monochromatic (default: false).
   */
  applyLensBlur(
    source?: DepthMapSource,
    focalDistance?: number,
    invertDepthMap?: boolean,
    shape?: Geometry,
    radius?: number,
    bladeCurvature?: number,
    rotation?: number,
    brightness?: number,
    threshold?: number,
    amount?: number,
    distribution?: NoiseDistribution,
    monochromatic?: boolean,
  ): void

  /**
   * Applies the Lens Flare filter with the specified brightness (0 - 300, as
   * a percentage), the x and y coordinates (unit value) of the flare center,
   * and the lens type.
   */
  applyLensFlare(brightness: number, flareCenter: UnitValue[], lensType: LensType): void

  /**
   * Applies the Maximum filter within the specified radius (in pixels).
   */
  applyMaximum(radius: number): void

  /**
   * Applies the Median Noise filter within the specified radius (in pixels).
   */
  applyMedianNoise(radius: number): void

  /**
   * Applies the Minimum filter within the specified radius (in pixels) (1 -
   * 100).
   */
  applyMinimum(radius: number): void

  /**
   * Applies the Motion Blur filter.
   */
  applyMotionBlur(angle: number, radius: number): void

  /**
   * Applies the NTSC colors filter.
   */
  applyNTSC(): void

  /**
   * Applies the Ocean Ripple filter.
   */
  applyOceanRipple(size: number, magnitude: number): void

  /**
   * Moves the layer the specified amount horizontally and vertically (min/max
   * amounts depend on layer size), leaving an undefined area at the layer’s
   * original location.
   */
  applyOffset(horizontal: UnitValue, vertical: UnitValue, undefinedAreas: OffsetUndefinedAreas): void

  /**
   * Applies the Pinch filter. amount is a percentage value.
   */
  applyPinch(amount: number): void

  /**
   * Applies the Polar Coordinates filter.
   */
  applyPolarCoordinates(conversion: PolarConversionType): void

  /**
   * Applies the Radial Blur filter in the specified amount, using either a
   * spin or zoom effect and the specified quality.
   */
  applyRadialBlur(amount: number, blurMethod: RadialBlurMethod, blurQuality: RadialBlurQuality): void

  /**
   * Applies the Ripple filter in the specified amount, throughout the image
   * and in the specified size.
   */
  applyRipple(amount: number, size: RippleSize): void

  /**
   * Applies the Sharpen filter.
   */
  applySharpen(): void

  /**
   * Applies the Sharpen Edges filter.
   */
  applySharpenEdges(): void

  /**
   * Applies the Sharpen More filter.
   */
  applySharpenMore(): void

  /**
   * Applies the Shear filter. The curve defines a curve with [2..255] points.
   * Each value in the curve array is a point pair, an array of an x and y
   * integer value.
   */
  applyShear(curve: number[][], undefinedAreas: UndefinedAreas): void

  /**
   * Applies the Smart Blur filter.
   */
  applySmartBlur(radius: number, threshold: number, blurQuality: SmartBlurQuality, mode: SmartBlurMode): void

  /**
   * Applies the Spherize filter. amount is a percentage value.
   */
  applySpherize(amount: number, mode: SpherizeMode): void

  /**
   * Applies the specified style to the layer. You must use a style from the
   * Styles list in the Layer Styles Palette.
   */
  applyStyle(styleName: string): void

  /**
   * Applies the Texture Fill filter.
   */
  applyTextureFill(textureFile: File): void

  /**
   * Applies the Twirl filter.
   */
  applyTwirl(angle: number): void

  /**
   * Applies the Unsharp Mask filter. (amount is a percentage value.
   */
  applyUnSharpMask(amount: number, radius: number, threshold: number): void

  /**
   * Applies the Wave filter. Scale factors are percentage values.
   */
  applyWave(
    generatorNumber: number,
    minimumWavelength: number,
    maximumWavelength: number,
    minimumAmplitude: number,
    maximumAmplitude: number,
    horizontalScale: number,
    verticalScale: number,
    waveType: WaveType,
    undefinedAreas: UndefinedAreas,
    randomSeed: number,
  ): void

  /**
   * Applies the Zigzag filter.
   */
  applyZigZag(amount: number, ridges: number, style: ZigZagType): void

  /**
   * Adjusts the contrast of the selected channels automatically.
   */
  autoContrast(): void

  /**
   * Adjusts the levels of the selected channels using the auto levels option.
   */
  autoLevels(): void

  /**
   * Cuts the layer without moving it to the clipboard.
   */
  clear(): void

  /**
   * Copies the layer to the clipboard. When the optional argument is set to
   * true, a merged copy is performed (that is, all visible layers are copied
   * to the clipboard).
   */
  copy(merge?: boolean): void

  /**
   * Cuts the layer to the clipboard.
   */
  cut(): void

  /**
   * Converts a color image to a grayscale image in the current color mode by
   * assigning equal values of each component color to each pixel.
   */
  desaturate(): void

  /**
   * ArtLayer or LayerSet Creates a duplicate of the object on the screen.
   */
  duplicate(relativeObject?: ArtLayer, insertionLocation?: ElementPlacement): void
  duplicate(relativeObject?: LayerSet, insertionLocation?: ElementPlacement): void

  /**
   * Redistributes the brightness values of pixels in an image to more evenly
   * represent the entire range of brightness levels within the image.
   */
  equalize(): void

  /**
   * Inverts the colors in the layer by converting the brightness value of
   * each pixel in the channels to the inverse value on the 256-step
   * color-values scale.
   */
  invert(): void

  /**
   * Links the layer with the specified layer.
   */
  link(with_: LayerSet): void

  /**
   * Merges the layer down, removing the layer from the document; returns a
   * reference to the art layer that this layer is merged into.
   */
  merge(): ArtLayer

  /**
   * Modifies a targeted (output) color channel using a mix of the existing
   * color channels in the image. The outputChannels parameter is an array of
   * channel specifications. For each component channel, specify a list of
   * adjustment values in the range [-200..200] followed by a 'constant' value
   * [-200..200].) When monochrome = true, the maximum number of channel value
   * specifications is 1. Valid only when docRef.mode = DocumentMode.RGB or
   * CMYK. RGB arrays must include four values. CMYK arrays must include five
   * values.
   */
  mixChannels(outputChannels: number[][], monochrome?: boolean): void

  /**
   * Moves the layer relative to the object specified in parameters. For art
   * layers, only the constant values ElementPlacement. PLACEBEFORE and
   * PLACEAFTER are valid. For layer sets, only the constant values
   * ElementPlacement. PLACEBEFORE and INSIDE are valid.
   */
  move(relativeObject: ArtLayer, insertionLocation: ElementPlacement): void
  move(relativeObject: LayerSet, insertionLocation: ElementPlacement): void

  /**
   * Adjust the layer’s color balance and temperature as if a color filter had
   * been applied. density is a percentage value.
   */
  photoFilter(fillColor?: SolidColor, density?: number, preserveLuminosity?: boolean): void

  /**
   * Specifies the number of tonal levels for each channel and then maps
   * pixels to the closest matching level.
   */
  posterize(levels: number): void

  /**
   * Converts the targeted contents in the layer into a flat, raster image.
   */
  rasterize(target: RasterizeType): void

  /**
   * Deletes the object.
   */
  remove(): void

  /**
   * Resizes the layer to the specified dimensions (as a percentage of its
   * current size) and places it in the specified position.
   */
  resize(horizontal?: number, vertical?: number, anchor?: AnchorPosition): void

  /**
   * Rotates rotates the layer around the specified anchor point (default:
   * MIDDLECENTER).
   */
  rotate(angle: number, anchor?: AnchorPosition): void

  /**
   * Modifies the amount of a process color in a specified primary color
   * without affecting the other primary colors. Each color array must have
   * four values.
   */
  selectiveColor(
    selectionMethod: AdjustmentReference,
    reds?: number[],
    yellows?: number[],
    greens?: number[],
    cyans?: number[],
    blues?: number[],
    magentas?: number[],
    whites?: number[],
    neutrals?: number[],
    blacks?: number[],
  ): void

  /**
   * Adjusts the range of tones in the image’s shadows and highlights. Amounts
   * and widths are percentage values. Radius values are in pixels.
   */
  shadowHighlight(
    shadowAmount?: number,
    shadowWidth?: number,
    shadowRadius?: number,
    highlightAmount?: number,
    highlightWidth?: number,
    highlightRadius?: number,
    colorCorrection?: number,
    midtoneContrast?: number,
    blackClip?: number,
    whiteClip?: number,
  ): void

  /**
   * Converts grayscale or color images to high-contrast, B/W images by
   * converting pixels lighter than the specified threshold to white and
   * pixels darker than the threshold to black.
   */
  threshold(level: number): void

  /**
   * Moves the layer the specified amount (in the given unit) relative to its
   * current position.
   */
  translate(deltaX?: UnitValue, deltaY?: UnitValue): void

  /**
   * Unlinks the layer.
   */
  unlink(): void
}

type ArtLayers = ArtLayer[] & {
  /**
   * The object's container.
   */
  readonly parent: Document

  /**
   * The class name of the referenced artLayers object.
   */
  readonly typename: string

  /**
   * Creates a new art layer in the document and adds the new object to this
   * collection.
   */
  add(): ArtLayer

  /**
   * Get the first element in the artLayers collection with the provided name.
   */
  getByName(name: string): ArtLayer

  /**
   * Removes all elements from the artLayers collection.
   */
  removeAll(): void
}

declare class BatchOptions {
  /**
   * The type of destination for the processed files (default:
   * BatchDestinationType.NODESTINATION).
   */
  destination: BatchDestinationType

  /**
   * The folder location for the processed files. Valid only when destination
   * = BatchDestinationType.FOLDER.
   */
  destinationFolder: Folder

  /**
   * The file in which to log errors encountered. To display errors on the
   * screen (and stop batch processing when errors occur) leave blank.
   */
  errorFile: File

  /**
   * A list of file naming options (maximum: 6). Valid only when destination
   * = BatchDestinationType.FOLDER.
   */
  fileNaming: FileNamingType[]

  /**
   * True to make the final file names Macintosh compatible (default: true).
   * Valid only when destination = BatchDestinationType.FOLDER.
   */
  macintoshCompatible: boolean

  /**
   * True to override action open commands (default: false).
   */
  overrideOpen: boolean

  /**
   * True to override save as action steps with the specified destination
   * (default: false). Valid only when destination =
   * BatchDestinationType.FOLDER or SAVEANDCLOSE.
   */
  overrideSave: boolean

  /**
   * The starting serial number to use in naming files (default: 1). Valid
   * only when destination = BatchDestinationType.FOLDER.
   */
  startingSerial: number

  /**
   * True to suppress the file open options dialogs (default: false).
   */
  suppressOpen: boolean

  /**
   * True to suppress the color profile warnings (default: false).
   */
  suppressProfile: boolean

  /**
   * The class name of the referenced batchOptions object.
   */
  readonly typename: string

  /**
   * True to make the final file name Unix compatible (default: true). Valid
   * only when destination = BatchDestinationType.FOLDER.
   */
  unixCompatible: boolean

  /**
   * True to make the final file names Windows compatible (default: true).
   * Valid only when destination = BatchDestinationType.FOLDER.
   */
  windowsCompatible: boolean
}

declare class BitmapConversionOptions {
  /**
   * The angle (in degrees) at which to orient individual dots. See shape.
   * Valid only when method = BitmapConversionType.HALFTONESCREEN.
   */
  angle: number

  /**
   * The number of printer dots (per inch) to use. Valid only when method =
   * BitmapConversionType.HALFTONESCREEN.
   */
  frequency: number

  /**
   * The conversion method to use (default:
   * BitmapConversionType.DIFFUSIONDITHER).
   */
  method: BitmapConversionType

  /**
   * The name of the pattern to use. For information about pre-installed
   * valid patterns, see Adobe Photoshop CC Help on the bitmap conversion
   * command, or view the options availabe in the Custom Color drop down box
   * after choosing the bitmap conversion command. Valid only when method =
   * BitmapConversionType.CUSTOMPATTERN.
   */
  patternName: string

  /**
   * The output resolution in pixels per inch (default: 72.0).
   */
  resolution: number

  /**
   * The dot shape to use. Valid only when method =
   * BitmapConversionType.HALFTONESCREEN.
   */
  shape: BitmapHalfToneType

  /**
   * The class name of the referenced bitmapConversionOptions object.
   */
  readonly typename: string
}

declare class BMPSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * The number of bits per channel.
   */
  depth: BMPDepthType

  /**
   * True to write the image from top to bottom (default: false). Available
   * only when osType = OperatingSystem.WINDOWS.
   */
  flipRowOrder: boolean

  /**
   * The target OS. (default: OperatingSystem.WINDOWS).
   */
  osType: OperatingSystem

  /**
   * True to use RLE compression. Available only when osType =
   * OperatingSystem.WINDOWS.
   */
  rleCompression: boolean

  /**
   * The class name of the referenced BMPSaveOptions object.
   */
  readonly typename: string
}

declare class CameraRAWOpenOptions {
  /**
   * The number of bits per channel.
   */
  bitsPerChannel: BitsPerChannelType

  /**
   * The blue hue of the shot.
   */
  blueHue: number

  /**
   * The blue saturation of the shot.
   */
  blueSaturation: number

  /**
   * The brightness of the shot.
   */
  brightness: number

  /**
   * The chromatic aberration B/Y of the shot.
   */
  chromaticAberrationBY: number

  /**
   * The chromatic aberration R/C of the shot
   */
  chromaticAberrationRC: number

  /**
   * The color noise reduction of the shot.
   */
  colorNoiseReduction: number

  /**
   * The colorspace for the image.
   */
  colorSpace: ColorSpaceType

  /**
   * The contrast of the shot.
   */
  contrast: number

  /**
   * The exposure of the shot.
   */
  exposure: number

  /**
   * The green hue of the shot.
   */
  greenHue: number

  /**
   * The green saturation of the shot.
   */
  greenSaturation: number

  /**
   * The luminance smoothing of the shot.
   */
  luminanceSmoothing: number

  /**
   * The red hue of the shot.
   */
  redHue: number

  /**
   * The red saturation of the shot.
   */
  redSaturation: number

  /**
   * The resolution of the document in pixels per inch.
   */
  resolution: number

  /**
   * The saturation of the shot.
   */
  saturation: number

  /**
   * The global settings for all Camera RAW options. Default:
   * CameraRAWSettingsType.CAMERA.
   */
  settings: CameraRAWSettingsType

  /**
   * The shadows of the shot.
   */
  shadows: number

  /**
   * The shadow tint of the shot.
   */
  shadowTint: number

  /**
   * The sharpness of the shot.
   */
  sharpness: number

  /**
   * The size of the new document.
   */
  size: CameraRAWSize

  /**
   * The temperature of the shot.
   */
  temperature: number

  /**
   * The tint of the shot.
   */
  tint: number

  /**
   * The class name of the referenced cameraRAWOpenOptions object.
   */
  readonly typename: string

  /**
   * The vignetting amount of the shot.
   */
  vignettingAmount: number

  /**
   * The vignetting mid point of the shot.
   */
  vignettingMidpoint: number

  /**
   * The white balance options for the image. These are lighting conditions
   * that affect color balance.
   */
  whiteBalance: WhiteBalanceType
}

interface Channel {
  /**
   * The color of the channel. Not valid when kind = ChannelType.COMPONENT.
   */
  color: SolidColor

  /**
   * A histogram of the color of the channel. The array contains 256 members.
   * Not valid when kind = ChannelType.COMPONENT. For component channel
   * histogram values, use the histogram property of the Document object
   * instead.
   */
  readonly histogram: number[]

  /**
   * The type of the channel.
   */
  kind: ChannelType

  /**
   * The name of the channel.
   */
  name: string

  /**
   * The opacity to use for alpha channels or the solidity to use for spot
   * channels. Valid only when kind = ChannelType.MASKEDAREA or SELECTEDAREA.
   */
  opacity: number

  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced channel object.
   */
  readonly typename: string

  /**
   * True if the channel is visible.
   */
  visible: boolean

  /**
   * Duplicates the channel.
   */
  duplicate(targetDocument?: Document): Channel

  /**
   * Merges a spot channel into the component channels.
   */
  merge(): void

  /**
   * Deletes the channel.
   */
  remove(): void
}

declare class Channels {
  /**
   * Creates a new channel object and adds it to this collection.
   */
  add(): Channel

  /**
   * Get the first element in the channels collection with the provided name.
   */
  getByName(name: string): Channel

  /**
   * Removes all alpha channel objects from the channels collection.
   */
  removeAll(): void
}

declare class CMYKColor {
  /**
   * The black color value (as percent).
   */
  black: number

  /**
   * The cyan color value (as percent).
   */
  cyan: number

  /**
   * The magenta color value (as percent).
   */
  magenta: number

  /**
   * The class name of the referenced CMYKColor object.
   */
  readonly typename: string

  /**
   * The yellow color value (as percent).
   */
  yellow: number
}

interface ColorSampler {
  /**
   * The color of the color sampler.
   */
  readonly color: SolidColor

  /**
   * The position of the color sampler in the document. The array (x,y)
   * represents the horizontal and vertical location of the count item.
   */
  readonly position: UnitValue[]

  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced ColorSampler object.
   */
  readonly typename: string

  /**
   * Moves the color sampler to a new location in the document. The position
   * parameter (x,y) represents the new horizontal and vertical locations of
   * the moved color sampler.
   */
  move(position: UnitValue[]): void

  /**
   * Deletes the ColorSampler object.
   */
  remove(): void
}

type ColorSamplers = ColorSampler[] & {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced ColorSamplers object.
   */
  readonly typename: string

  /**
   * Creates a new color sampler object and adds it to this collection. The
   * position parameter (x,y) represents the new horizontal and vertical
   * locations of the moved color sampler.
   */
  add(position: UnitValue[]): ColorSampler

  /**
   * Removes all ColorSampler objects from the ColorSamplers collection.
   */
  removeAll(): void
}

declare class ContactSheetOptions {
  /**
   * True to place the images horizontally (left to right, then top to
   * bottom) first (default: true).
   */
  acrossFirst: boolean

  /**
   * True to rotate images for the best fit (default: false).
   */
  bestFit: boolean

  /**
   * True to use the filename as a caption for the image (default: true).
   */
  caption: boolean

  /**
   * The number of columns to include (default: 5).
   */
  columnCount: number

  /**
   * True to flatten all layers in the final document (default: true).
   */
  flatten: boolean

  /**
   * The font used for the caption (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The font size to use for the caption (default: 12).
   */
  fontSize: number

  /**
   * The height (in pixels) of the resulting document (default: 720).
   */
  height: number

  /**
   * The horizontal spacing (in pixels) between images (default: 1).
   */
  horizontal: number

  /**
   * The document color mode (default: NewDocumentMode.RGB).
   */
  mode: NewDocumentMode

  /**
   * The resolution of the document in pixels per inch (default: 72.0).
   */
  resolution: number

  /**
   * The number of rows to use (default: 6).
   */
  rowCount: number

  /**
   * The class name of the referenced contactSheetOptions object.
   */
  readonly typename: string

  /**
   * True to auto space the images (default: true).
   */
  useAutoSpacing: boolean

  /**
   * The vertical spacing (in pixels) between images (default: 1). Valid only
   * when useAutoSpacing = false.
   */
  vertical: number

  /**
   * The width (in pixels) of the resulting document (default: 576).
   */
  width: number
}

interface CountItem {
  /**
   * The position of the count item in the document.
   */
  readonly position: UnitValue[]

  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced CountItem object.
   */
  readonly typename: string

  /**
   * Deletes the CountItem object.
   */
  remove(): void
}

type CountItems = CountItem[] & {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced CountItems object.
   */
  readonly typename: string

  /**
   * Creates a new count item object and adds it to this collection. Parameter
   * position (x,y) represents the horizontal and vertical positions,
   * respectively, of the CountItem object.
   */
  add(position: UnitValue[]): CountItem

  /**
   * Get the first element in the CountItems collection with the provided name.
   */
  getByName(name: string): CountItem

  /**
   * Removes all CountItem objects from the CountItems collection.
   */
  removeAll(): void
}

declare class DCS1_SaveOptions {
  /**
   * (default: DCSType.COLORCOMPOSITE).
   */
  dCS: DCSType

  /**
   * True to embed the color profile in the document
   */
  embedColorProfile: boolean

  /**
   * The type of encoding to use for document (default: SaveEncoding.BINARY).
   */
  encoding: SaveEncoding

  /**
   * True to include halftone screen (default: false).
   */
  halftoneScreen: boolean

  /**
   * True to use image interpolation (default: false)
   */
  interpolation: boolean

  /**
   * The type of preview (default: Preview.MACOSEIGHTBIT).
   */
  preview: Preview

  /**
   * True to include the Transfer functions to compensate for dot gain
   * between the image and film (default: false).
   */
  transferFunction: boolean

  /**
   * The class name of the referenced DCS1_SaveOptions object.
   */
  readonly typename: string

  /**
   * True to include vector data. Valid only if the document includes vector
   * data (unrasterized text).
   */
  vectorData: boolean
}

declare class DCS2_SaveOptions {
  /**
   * The type of composite file to create (default: DCSType.NOCOMPOSITE).
   */
  dCS: DCSType

  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * The type of encoding to use (default: SaveEncoding.BINARY).
   */
  encoding: SaveEncoding

  /**
   * True to include the halftone screen (default: false).
   */
  halftoneScreen: boolean

  /**
   * True to use image interpolation (default: false).
   */
  interpolation: boolean

  /**
   * True to save color channels as multiple files or a single file (default:
   * false).
   */
  multiFileDCS: boolean

  /**
   * The preview type (default: Preview.MACOSEIGHTBIT).
   */
  preview: Preview

  /**
   * True to save spot colors.
   */
  spotColors: boolean

  /**
   * True to include the Transfer functions to compensate for dot gain
   * between the image and film (default: false).
   */
  transferFunction: boolean

  /**
   * The class name of the referenced DCS2_SaveOptions object.
   */
  readonly typename: string

  /**
   * True to include vector data. Valid only if the document includes vector
   * data (unrasterized text).
   */
  vectorData: boolean
}

declare class DICOMOpenOptions {
  /**
   * True to make the patient information anonymous.
   */
  anonymize: boolean

  /**
   * Number of columns in n-up configuration.
   */
  columns: number

  /**
   * True to reverse (invert) the image.
   */
  reverse: boolean

  /**
   * The number of rows in n-up configuration.
   */
  rows: number

  /**
   * True to show overlays.
   */
  showOverlays: boolean

  /**
   * The class name of the referenced DICOMOpenOptions object.
   */
  readonly typename: string

  /**
   * The contrast of the image in Houndsfield units.
   */
  windowLevel: number

  /**
   * The brightness of the image in Houndsfield units.
   */
  windowWidth: number
}

interface Document {
  /**
   * The selected channels.
   */
  activeChannels: Channel[]

  /**
   * The history state to use with the history brush.
   */
  activeHistoryBrushSource: Guide

  /**
   * The selected HistoryState object.
   */
  activeHistoryState: Guide

  /**
   * The selected layer.
   */
  activeLayer: Layer

  /**
   * The art layers collection.
   */
  readonly artLayers: ArtLayers

  /**
   * The background layer of the document.
   */
  readonly backgroundLayer: ArtLayer

  /**
   * The number of bits per channel.
   */
  bitsPerChannel: BitsPerChannelType

  /**
   * The channels collection.
   */
  readonly channels: Channels

  /**
   * The name of the color profile. Valid only when colorProfileType =
   * ColorProfile.CUSTOM or WORKING.
   */
  colorProfileName: string

  /**
   * Whether the document uses the working color profile, a custom profile,
   * or no profile.
   */
  colorProfileType: ColorProfileType

  /**
   * The current color samplers associated with this document.
   */
  readonly colorSamplers: ColorSamplers

  /**
   * The color channels that make up the document; for instance, the Red,
   * Green, and Blue channels for an RGB document.
   */
  readonly componentChannels: Channel[]

  /**
   * The current count items. Note: For additional information about count
   * items, see Adobe Photoshop CC help on the Count Tool.
   */
  readonly countItems: CountItems

  /**
   * The full path name of the document.
   */
  readonly fullName: File

  /**
   * The guides collection.
   */
  readonly guides: Guides

  /**
   * The height of the document (unit value).
   */
  readonly height: UnitValue

  /**
   * A histogram showing the number of pixels at each color intensity level
   * for the composite channel. The array c ontains 256 members. Valid only
   * when mode = DocumentMode.RGB, CMYK; or INDEXEDCOLOR.
   */
  readonly histogram: number[]

  /**
   * The history states collection.
   */
  readonly historyStates: HistoryStates

  /**
   * Metadata about the document.
   */
  readonly info: DocumentInfo

  /**
   * The layer compositions collection.
   */
  readonly layerComps: LayerComps

  /**
   * The layers collection.
   */
  readonly layers: Layers

  /**
   * The layer set collection.
   */
  readonly layerSets: LayerSets

  /**
   * True if the document a is workgroup document.
   */
  readonly managed: boolean

  /**
   * The measurement scale for the document. Note: The measurement scale
   * feature is available in the Extended version only.
   */
  readonly measurementScale: MeasurementScale

  /**
   * The color profile.
   */
  readonly mode: DocumentMode

  /**
   * The document's name.
   */
  readonly name: string

  /**
   * The application object that contains this document.
   */
  readonly parent: Application

  /**
   * The path to the document.
   */
  readonly path: File

  /**
   * The path items collection.
   */
  readonly pathItems: PathItems

  /**
   * The (custom) pixel aspect ratio to use.
   */
  pixelAspectRatio: number

  /**
   * The print settings for the document.
   */
  readonly printSettings: DocumentPrintSettings

  /**
   * True if the document is in Quick Mask mode.
   */
  quickMaskMode: boolean

  /**
   * The document’s resolution (in pixels per inch).
   */
  readonly resolution: number

  /**
   * True if the document has been saved since the last change.
   */
  readonly saved: boolean

  /**
   * The selected area of the document.
   */
  readonly selection: Selection

  /**
   * The class name of the Document object.
   */
  readonly typename: string

  /**
   * The width of the document (unit value).
   */
  readonly width: UnitValue

  /**
   * XMP metadata for the document. Camera RAW settings for the image are
   * stored here for example. Methods
   */
  readonly xmpMetadata: xmpMetadata

  /**
   * Counts the number of objects in a document. Available in the Extended
   * Version only. Creates a CountItem object for each object counted. For
   * additional information about how to set up objects to count, see the
   * Count Tool in the Adobe Photoshop CC Help
   */
  autoCount(channel: Channel, threshold: number): void

  /**
   * Changes the color profile of the document.
   */
  changeMode(destinationMode: ChangeMode, options?: IndexedConversionOptions): void

  /**
   * Closes the document. If any changes have been made, the script presents
   * an alert with three options: save, do not save, prompt to save. The
   * optional parameter specifies a selection in the alert box (default:
   * SaveOptionsType. PROMPTTOSAVECHANGES).
   */
  close(saving?: SaveOptions): void

  /**
   * Changes the color profile. The destinationProfile parameter must be
   * either a string that names the color mode or Working RGB, Working CMYK,
   * Working Gray, Lab Color (meaning one of the working color spaces or Lab
   * color).
   */
  convertProfile(destinationProfile: string, intent: Intent, blackPointCompensation?: boolean, dither?: boolean): void

  /**
   * Crops the document. The bounds parameter is an array of four coordinates
   * for the region remaining after cropping, [left, top, right, bottom].
   */
  crop(bounds: UnitValue[], angle?: number, width?: UnitValue, height?: UnitValue): void

  /**
   * Creates a duplicate of the document object. The optional parameter name
   * provides the name for the duplicated document. The optional parameter
   * mergeLayersOnly indicates whether to only duplicate merged layers.
   */
  duplicate(name?: string, mergeLayersOnly?: boolean): Document

  /**
   * —or— ExportOptionsSaveForWeb Exports the paths in the document to an
   * Illustrator file, or exports the document to a file with Web or device
   * viewing optimizations. This is equivalent to choosing File > Export >
   * Paths To Illustrator, or File > Save For Web and Devices.
   */
  exportDocument(exportIn: File, exportAs?: ExportType.ILLUSTRATORPATHS, options?: ExportOptionsIllustrator): void
  exportDocument(exportIn: File, exportAs?: ExportType.SAVEFORWEB, options?: ExportOptionsSaveForWeb): void

  /**
   * Flattens all layers in the document.
   */
  flatten(): void

  /**
   * Flips the image within the canvas in the specified direction.
   */
  flipCanvas(direction: Direction): void

  /**
   * Imports annotations into the document.
   */
  importAnnotations(file: File): void

  /**
   * Flattens all visible layers in the document.
   */
  mergeVisibleLayers(): void

  /**
   * Pastes the contents of the clipboard into the document. If the optional
   * argument is set to true and a selection is active, the contents are
   * pasted into the selection.
   */
  paste(intoSelection?: boolean): ArtLayer

  /**
   * Prints the document. printSpace specifies the color space for the
   * printer. Valid values are nothing (that is, the same as the source); or
   * Working RGB, Working CMYK, Working Gray, Lab Color (meaning one of the
   * working color spaces or Lab color); or a string specifying a specific
   * colorspace (default is same as source).
   */
  print(sourceSpace?: SourceSpaceType, printSpace?: string, intent?: Intent, blackPointCompensation?: boolean): void

  /**
   * Print one copy of the document.
   */
  printOneCopy(): void

  /**
   * Rasterizes all layers.
   */
  rasterizeAllLayers(): void

  /**
   * Record measurements of document.
   */
  recordMeasurements(source?: MeasurementSource, dataPoints?: string[]): void

  /**
   * Changes the size of the canvas to display more or less of the image but
   * does not change the image size. See resizeImage.
   */
  resizeCanvas(width?: UnitValue, height?: UnitValue, anchor?: AnchorPosition): void

  /**
   * Changes the size of the image. The amount parameter controls the amount
   * of noise value when using preserve details (Range: 0 - 100).
   */
  resizeImage(
    width?: UnitValue,
    height?: UnitValue,
    resolution?: number,
    resampleMethod?: ResampleMethod,
    amount?: number,
  ): void

  /**
   * Expands the document to show clipped sections.
   */
  revealAll(): void

  /**
   * Rotates the canvas (including the image) in clockwise direction.
   */
  rotateCanvas(angle: number): void

  /**
   * Saves the document.
   */
  save(): void

  /**
   * Saves the document in a specific format. Specify the save options
   * appropriate to the format by passing one of these objects: BMPSaveOptions
   * DCS1_SaveOptions DCS2_SaveOptions EPSSaveOptions GIFSaveOptions
   * JPEGSaveOptions PDFSaveOptions PhotoshopSaveOptions PICTFileSaveOptions
   * PICTResourceSaveOptions PixarSaveOptions PNGSaveOptions RawSaveOptions
   * SGIRGBSaveOptions TargaSaveOptions TiffSaveOptions
   */
  saveAs(saveIn: File, options?: any, asCopy?: boolean, extensionType?: Extension): void

  /**
   * Splits the document channels into separate images.
   */
  splitChannels(): Document[]

  /**
   * Provides a single entry in history states for the entire script provided
   * by javaScriptString. Allows a single undo for all actions taken in the
   * script. The historyString parameter provides the string to use for the
   * history state. The javaScriptString parameter provides a string of
   * JavaScript code to excute while history is suspended.
   */
  suspendHistory(historyString: string, javaScriptString: string): void

  /**
   * Applies trapping to a CMYK document. Valid only when docRef.mode =
   * DocumentMode.CMYK.
   */
  trap(width: number): void

  /**
   * Trims the transparent area around the image on the specified sides of the
   * canvas. Default is true for all Boolean parameters.
   */
  trim(type?: TrimType, top?: boolean, left?: boolean, bottom?: boolean, right?: boolean): void
}

declare class DocumentPrintSettings {
  /**
   * Background color of page.
   */
  backgroundColor: SolidColor

  /**
   * Bleed width
   */
  bleedWidth: UnitValue

  /**
   * Print the caption found in FileInfo.
   */
  caption: boolean

  /**
   * Print center crop marks.
   */
  centerCropMarks: boolean

  /**
   * Print color calibration bars.
   */
  colorBars: boolean

  /**
   * Number of copies to print.
   */
  copies: number

  /**
   * Print corner crop marks.
   */
  cornerCropMarks: boolean

  /**
   * Color handling.
   */
  readonly colorHandling: PrintColorHandling

  /**
   * The currently active printer.
   */
  activePrinter: string

  /**
   * Flip the image horizontally.
   */
  flip: boolean

  /**
   * Print a hard proof.
   */
  hardProof: boolean

  /**
   *
   */
  interpolate: boolean

  /**
   * Prints the document title.
   */
  labels: boolean

  /**
   * Map blacks.
   */
  mapBlack: boolean

  /**
   * Invert the image colors.
   */
  negative: boolean

  /**
   * Color conversion intent when print space is different from the source
   * space.
   */
  renderIntent: Intent

  /**
   * The x position of the image on page.
   */
  readonly posX: UnitValue

  /**
   * The y position of the image on page.
   */
  readonly posY: UnitValue

  /**
   * The width of the print border.
   */
  printBorder: UnitValue

  /**
   * Name of the printer.
   */
  printerName: string

  /**
   * color space for printer. Can be nothing (meaning same as source);
   * 'Working RGB', 'Working CMYK', 'Working Gray', 'Lab Color' (meaning one
   * of the working spaces or Lab color); or a string specifying a specific
   * colorspace (default is same as source)
   */
  printSpace: string

  /**
   * Print registration marks.
   */
  registrationMarks: boolean

  /**
   * Scale of image on page.
   */
  readonly scale: number

  /**
   * Include vector data. Methods
   */
  vectorData: boolean

  /**
   * Set the position of the image on the page.
   */
  setPagePosition(docPosition: DocPositionStyle, posX: UnitValue, posY: UnitValue, scale: number): void
}

interface DocumentInfo {
  /**
   *
   */
  author: string

  /**
   *
   */
  authorPosition: string

  /**
   *
   */
  caption: string

  /**
   *
   */
  captionWriter: string

  /**
   *
   */
  category: string

  /**
   *
   */
  city: string

  /**
   * The copyrighted status.
   */
  copyrighted: CopyrightedType

  /**
   *
   */
  copyrightNotice: string

  /**
   *
   */
  country: string

  /**
   *
   */
  creationDate: string

  /**
   *
   */
  credit: string

  /**
   * Camera data that includes camera settings used when the image was taken.
   * Each array member is a tag pair, an array of [tag, tag_data]; for
   * example, [ "camera" "Cannon"].
   */
  readonly exif: string[][]

  /**
   *
   */
  headline: string

  /**
   *
   */
  instructions: string

  /**
   *
   */
  jobName: string

  /**
   * A list of keywords that can identify the document or its contents.
   */
  keywords: string[]

  /**
   *
   */
  ownerUrl: string

  /**
   * The info object's container.
   */
  readonly parent: Document

  /**
   *
   */
  provinceState: string

  /**
   *
   */
  source: string

  /**
   *
   */
  supplementalCategories: string[]

  /**
   *
   */
  title: string

  /**
   *
   */
  transmissionReference: string

  /**
   * The class name of the referenced info object.
   */
  readonly typename: string

  /**
   *
   */
  urgency: Urgency
}

type Documents = Document[] & {
  /**
   * The containing application.
   */
  readonly parent: Application

  /**
   * The class name of the referenced documents object.
   */
  readonly typename: string

  /**
   * Creates a new document object and adds it to this collection.
   * pixelAspectRatio: Default is 1.0, a square aspect ratio.
   * bitsPerChannelType: Default is BitsPerChannelType.EIGHT.
   */
  add(
    width?: UnitValue,
    height?: UnitValue,
    resolution?: number,
    name?: string,
    mode?: NewDocumentMode,
    initialFill?: DocumentFill,
    pixelAspectRatio?: number,
    bitsPerChannel?: BitsPerChannelType,
    colorProfileName?: string,
  ): Document

  /**
   * Gets the first element in the documents collection with the provided name
   */
  getByName(name: string): Document
}

declare class EPSOpenOptions {
  /**
   * True to use antialias.
   */
  antiAlias: boolean

  /**
   * True to constrain the proportions of the image.
   */
  constrainProportions: boolean

  /**
   * The height of the image (unit value).
   */
  height: UnitValue

  /**
   * The color profile to use as the document mode.
   */
  mode: OpenDocumentMode

  /**
   * The resolution of the document in pixels per inch.
   */
  resolution: number

  /**
   * The class name of the referenced EPSOpenOptions object.
   */
  readonly typename: string

  /**
   * The width of the image (unit value).
   */
  width: UnitValue
}

declare class EPSSaveOptions {
  /**
   * True to embed the color profile in this document.
   */
  embedColorProfile: boolean

  /**
   * The type of encoding to use (default: SaveEncoding.BINARY).
   */
  encoding: SaveEncoding

  /**
   * True to include the halftone screen (default: false).
   */
  halftoneScreen: boolean

  /**
   * True to use image interpolation (default: false).
   */
  interpolation: boolean

  /**
   * The preview type.
   */
  preview: Preview

  /**
   * True to use Postscript color management (default: false).
   */
  psColorManagement: boolean

  /**
   * True to include the Transfer functions to compensate for dot gain
   * between the image and film (default: false).
   */
  transferFunction: boolean

  /**
   * True to display white areas as transparent. Valid only when
   * document.mode = DocumentMode.BITMAP. See also changeMode().
   */
  transparentWhites: boolean

  /**
   * The class name of the referenced EPSSaveOptions object.
   */
  readonly typename: string

  /**
   * True to include vector data. Valid only if the document includes vector
   * data (text).
   */
  vectorData: boolean
}

declare class ExportOptionsIllustrator {
  /**
   * The type of path to export (default: IllustratorPathType.DOCUMENTBOUNDS).
   */
  path: IllustratorPathType

  /**
   * The name of the path to export. Valid only when path =
   * IllustratorPathType.NAMEDPATH.
   */
  pathName: string

  /**
   * The class name of the referenced exportOptionsIllustrator object.
   */
  readonly typename: string
}

declare class ExportOptionsSaveForWeb {
  /**
   * Applies blur to the image to reduce artifacts (default: 0.0).
   */
  blur: number

  /**
   * The color reduction algorithm (default: ColorReductionType.SELECTIVE).
   */
  colorReduction: ColorReductionType

  /**
   * The number of colors in the palette (default: 256).
   */
  colors: number

  /**
   * The type of dither (default: Dither.DIFFUSION).
   */
  dither: Dither

  /**
   * The amount of dither (default: 100). Valid only when dither =
   * Dither.DIFFUSION.
   */
  ditherAmount: number

  /**
   * The file format to use (default: SaveDocumentType.COMPUSERVEGIF). Note:
   * For this property, only COMPUSERVEGIF, JPEG, PNG-8, PNG-24, and BMP are
   * supported.
   */
  format: SaveDocumentType

  /**
   * True to include the document’s embedded color profile (default: false).
   */
  includeProfile: boolean

  /**
   * True to download in multiple passes; progressive (default: false).
   */
  interlaced: boolean

  /**
   * The amount of lossiness allowed (default: 0).
   */
  lossy: number

  /**
   * The colors to blend transparent pixels against.
   */
  matteColor: RGBColor

  /**
   * True to create smaller but less compatible files (default: true). Valid
   * only when format = SaveDocumentType.JPEG.
   */
  optimized: boolean

  /**
   * Indicates the number of bits; true = 8, false = 24 (default: true).
   * Valid only when format = SaveDocumentType.PNG.
   */
  PNG8: boolean

  /**
   * The quality of the produced image as a percentage; default: 60.
   */
  quality: number

  /**
   * Indication of transparent areas of the image should be included in the
   * saved image(default: true).
   */
  transparency: boolean

  /**
   * The amont of transparency dither (default: 100). Valid only if
   * transparency = true.
   */
  transparencyAmount: number

  /**
   * The transparency dither algorithm (default: transparencyDither =
   * Dither.NONE).
   */
  transparencyDither: Dither

  /**
   * The class name of the referenced ExportOptionsSaveForWeb object.
   */
  readonly typename: string

  /**
   * The tolerance amount within which to snap close colors to web palette
   * colors (default: 0). File Folder ExtendScript defines the JavaScript
   * classes File and Folder to encapsulate file-system references in a
   * platform-independent manner; see ‘JavaScript support in Adobe Photoshop
   * CC’ on page 32. For references details of these classes, see the
   * JavaScript Tools Guide.
   */
  webSnap: number
}

declare class GalleryBannerOptions {
  /**
   * The web photo gallery contact info.
   */
  contactInfo: string

  /**
   * The web photo gallery date (default: current date).
   */
  date: string

  /**
   * The font setting for the banner text (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The font size for the banner text (default: 3).
   */
  fontSize: number

  /**
   * The web photo gallery photographer.
   */
  photographer: string

  /**
   * The web photo gallery site name (default: Adobe Web Photo Gallery).
   */
  siteName: string

  /**
   * The class name of the referenced galleryBannerOptions object.
   */
  readonly typename: string
}

declare class GalleryCustomColorOptions {
  /**
   * The color to use to indicate an active link.
   */
  activeLinkColor: RGBColor

  /**
   * The background color.
   */
  backgroundColor: RGBColor

  /**
   * The banner color.
   */
  bannerColor: RGBColor

  /**
   * The color to use to indicate a link.
   */
  linkColor: RGBColor

  /**
   * The text color.
   */
  textColor: RGBColor

  /**
   * The class name of the referenced galleryCustomColorOptions object.
   */
  readonly typename: string

  /**
   * The color to use to indicate a visited link.
   */
  visitedLinkColor: RGBColor
}

declare class GalleryImagesOptions {
  /**
   * The size (in pixels) of the border that separates images (default: 0).
   */
  border: number

  /**
   * True to generate image captions (default: false).
   */
  caption: boolean

  /**
   * The resized image dimensions in pixels (default: 350). Valid only when
   * resizeImages = true.
   */
  dimension: number

  /**
   * The font to use for image captions (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The font size for image captions (default: 3). Valid only when caption =
   * true.
   */
  fontSize: number

  /**
   * The quality setting for a JPEG image (default: 5).
   */
  imageQuality: number

  /**
   * True to include copyright information in captions (default: false).
   * Valid only when caption = true.
   */
  includeCopyright: boolean

  /**
   * True to include the credits in image captions (default: false). Valid
   * only when caption = true.
   */
  includeCredits: boolean

  /**
   * True to include the file name in image captions (default: true). Valid
   * only when caption = true.
   */
  includeFilename: boolean

  /**
   * True to include the title in image captions (default: false). Valid only
   * when caption = true.
   */
  includeTitle: boolean

  /**
   * True to add numeric links (default: true).
   */
  numericLinks: boolean

  /**
   * The image dimensions to constrain in the gallery image (default:
   * GalleryConstrainType.CONSTRAINBOTH). Valid only when resizeImages = true.
   */
  resizeConstraint: GalleryConstrainType

  /**
   * True to automatically resize images for placement on the gallery pages
   * (default: true).
   */
  resizeImages: boolean

  /**
   * The class name of the referenced galleryImagesOptions object.
   */
  readonly typename: string
}

declare class GalleryOptions {
  /**
   * True to add width and height attributes for images (default: true).
   */
  addSizeAttributes: boolean

  /**
   * The options related to banner settings.
   */
  bannerOptions: GalleryBannerOptions

  /**
   * The options related to custom color settings.
   */
  customColorOptions: GalleryCustomColorOptions

  /**
   * The email address to show on the web page.
   */
  emailAddress: string

  /**
   * The options related to images settings.
   */
  imagesOptions: GalleryImagesOptions

  /**
   * True to include all files found in sub folders of the input folder
   * (default: true).
   */
  includeSubFolders: boolean

  /**
   * The style to use for laying out the web page (default: Centered Frame 1
   * - Basic).
   */
  layoutStyle: string

  /**
   * True to save metadata (default: false).
   */
  preserveAllMetadata: boolean

  /**
   * The options related to security settings.
   */
  securityOptions: GallerySecurityOptions

  /**
   * The options related to thumbnail image settings.
   */
  thumbnailOptions: GalleryThumbnailOptions

  /**
   * The class name of the referenced galleryOptions object.
   */
  readonly typename: string

  /**
   * True to use the short web page extension .htm. If false, use the web
   * page extension .html (default: true).
   */
  useShortExtension: boolean

  /**
   * True to use UTF-8 encoding for the web page (default: false).
   */
  useUTF8Encoding: boolean
}

declare class GallerySecurityOptions {
  /**
   * The web photo gallery security content (default:
   * GallerySecurityType.NONE).
   */
  content: GallerySecurityType

  /**
   * The web photo gallery security font (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The web photo gallery security font size (default: 3).
   */
  fontSize: number

  /**
   * The web page security opacity as a percent (default: 100).
   */
  opacity: number

  /**
   * The web photo gallery security custom text.
   */
  text: string

  /**
   * The web page security text color.
   */
  textColor: GallerySecurityTextColorType

  /**
   * The web photo gallery security text position (default:
   * GallerySecurityTextPositionType. CENTERED).
   */
  textPosition: GallerySecurityTextPositionType

  /**
   * The web photo gallery security text orientation to use (default:
   * GallerySecurityTextRotateType. ZERO).
   */
  textRotate: GallerySecurityTextRotateType

  /**
   * The class name of the referenced gallerySecurityOptions object.
   */
  readonly typename: string
}

declare class GalleryThumbnailOptions {
  /**
   * The amount of border pixels you want around your thumbnail images
   * (default: 0).
   */
  border: number

  /**
   * True if there is a caption (default: false).
   */
  caption: boolean

  /**
   * The number of columns on the page (default: 5).
   */
  columnCount: number

  /**
   * The web photo gallery thumbnail dimension in pixels (default: 75).
   */
  dimension: number

  /**
   * The web photo gallery font (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The font size for thumbnail images text (default: 3).
   */
  fontSize: number

  /**
   * True to include copyright information for thumbnails (default: false).
   */
  includeCopyright: boolean

  /**
   * True to include credits for thumbnails (default: false).
   */
  includeCredits: boolean

  /**
   * True to include file names for thumbnails (default: false).
   */
  includeFilename: boolean

  /**
   * True to include titles for thumbnails (default: false).
   */
  includeTitle: boolean

  /**
   * The number of rows on the page (default: 3).
   */
  rowCount: number

  /**
   * The thumbnail image size (default: GalleryThumbSizeType.MEDIUM).
   */
  size: GalleryThumbSizeType

  /**
   * The class name of the referenced GalleryThumbnailOptions object.
   */
  readonly typename: string
}

declare class GIFSaveOptions {
  /**
   * The number of palette colors. Valid only when palette =
   * Palette.LOCALADAPTIVE, LOCALPERCEPTUAL, LOCALSELECTIVE, MACOSPALETTE,
   * UNIFORM, WEBPALETTE; or WINDOWSPALETTE .
   */
  colors: number

  /**
   * The dither type.
   */
  dither: Dither

  /**
   * The amount of dither (default: 75). Valid only when dither =
   * Dither.DIFFUSION.
   */
  ditherAmount: number

  /**
   * The type of colors to force into the color palette.
   */
  forced: ForcedColors

  /**
   * True if rows should be interlaced (default: false).
   */
  interlaced: boolean

  /**
   * The color to use to fill anti-aliased edges adjacent to transparent
   * areas of the image (default: MatteType.WHITE). When transparency = false,
   * the matte color is applied to transparent areas.
   */
  matte: MatteType

  /**
   * The type of palette to use (default: Palette.LOCALSELECTIVE).
   */
  palette: PaletteType

  /**
   * True to protect colors in the image that contain entries in the color
   * table from being dithered. Valid only when dither = Dither.DIFFUSION.
   */
  preserveExactColors: boolean

  /**
   * True to preserve transparent areas of the image during conversion to GIF
   * format.
   */
  transparency: boolean

  /**
   * The class name of the referenced GIFSaveOptions object.
   */
  readonly typename: string
}

declare class GrayColor {
  /**
   * The gray value (default: 0.0).
   */
  gray: number

  /**
   * The class name of the referenced grayColor object.
   */
  readonly typename: string
}

declare class Guide {
  /**
   * Indicates whether the guide is vertical or horizontal.
   */
  direction: Direction

  /**
   * Location of the guide from origin of image.
   */
  coordinate: UnitValue
}

type Guides = Guide[] & {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced guides object.
   */
  readonly typename: string

  /**
   * Creates a new guide object and adds it to this collection.
   */
  add(direction: Direction, coordinate: UnitValue): Guide

  /**
   * Gets the first element in the guides collection with the provided name
   */
  getByName(name: string): Guide
}

interface HistoryState {
  /**
   * The HistoryState object's name.
   */
  readonly name: string

  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * True if the history state is a snapshot.
   */
  readonly snapshot: boolean

  /**
   * The class name of the referenced HistoryState object.
   */
  readonly typename: string
}

type HistoryStates = HistoryState[] & {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced HistoryStates object.
   */
  readonly typename: string

  /**
   * Get the first element in the HistoryStates collection with the provided
   * name.
   */
  getByName(name: string): Guide
}

declare class HSBColor {
  /**
   * The brightness value.
   */
  brightness: number

  /**
   * The hue value.
   */
  hue: number

  /**
   * The saturation value.
   */
  saturation: number

  /**
   * The class name of the referenced HSBColor object.
   */
  readonly typename: string
}

declare class IndexedConversionOptions {
  /**
   * The number of palette colors. Valid only when palette =
   * Palette.LOCALADAPTIVE, LOCALPERCEPTUAL, LOCALSELECTIVE, MACOSPALETTE,
   * UNIFORM, WEBPALETTE, or WINDOWSPALETTE.
   */
  colors: number

  /**
   * The dither type.
   */
  dither: Dither

  /**
   * The amount of dither. Valid only when dither = Dither.diffusion.
   */
  ditherAmount: number

  /**
   * The type of colors to force into the color palette.
   */
  forced: ForcedColors

  /**
   * The color to use to fill anti-aliased edges adjacent to transparent
   * areas of the image (default: MatteType.WHITE). When transparency = false,
   * the matte color is applied to transparent areas.
   */
  matte: MatteType

  /**
   * The palette type (default: Palette.EXACT).
   */
  palette: PaletteType

  /**
   * True to protect colors in the image that contain entries in the color
   * table from being dithered. Valid only when dither = Dither.DIFFUSION.
   */
  preserveExactColors: boolean

  /**
   * True to preserve transparent areas of the image during conversion to GIF
   * format.
   */
  transparency: boolean

  /**
   * The class name of the referenced IndexedConversionOptions object.
   */
  readonly typename: string
}

declare class JPEGSaveOptions {
  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * The download format to use (default: FormatOptions.STANDARDBASELINE).
   */
  formatOptions: FormatOptions

  /**
   * The color to use to fill anti-aliased edges adjacent to transparent
   * areas of the image (default: MatteType.WHITE). When transparency is
   * turned off for an image, the matte color is applied to transparent areas.
   */
  matte: MatteType

  /**
   * The image quality setting to use; affects file size and compression
   * (default: 3).
   */
  quality: number

  /**
   * The number of scans to make to incrementally display the image on the
   * page (default: 3). Valid only for when formatOptions =
   * FormatOptions.PROGRESSIVE.
   */
  scans: number

  /**
   * The class name of the referenced JPEGSaveOptions object.
   */
  readonly typename: string
}

declare class LabColor {
  /**
   * The a-value.
   */
  a: number

  /**
   * The b-value.
   */
  b: number

  /**
   * The L-value.
   */
  l: number

  /**
   * The class name of the referenced LabColor object.
   */
  readonly typename: string
}

interface LayerComp {
  /**
   * True to use layer appearance (layer styles) settings.
   */
  appearance: boolean

  /**
   * A description of the layer comp.
   */
  comment: string

  /**
   * The name of the layer comp.
   */
  name: string

  /**
   * The containing document.
   */
  parent: Document

  /**
   * True to use layer position.
   */
  position: boolean

  /**
   * True if the layer comp is currently selected.
   */
  readonly selected: boolean

  /**
   * The class name of the referenced layerComp object.
   */
  readonly typename: string

  /**
   * True to use layer visibility settings .
   */
  visibility: boolean

  /**
   * Applies the layer comp to the document.
   */
  apply(): void

  /**
   * Recaptures the current layer state(s) for this layer comp.
   */
  recapture(): void

  /**
   * Deletes the layerComp object.
   */
  remove(): void

  /**
   * Resets the layer comp state to the document state.
   */
  resetfromComp(): void
}

type LayerComps = LayerComp[] & {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The class name of the referenced layerComps object.
   */
  readonly typename: string

  /**
   * Creates a new layer composition object and adds it to this collection.
   */
  add(name: string, comment: string, appearance: boolean, position: boolean, visibility: boolean): LayerComp

  /**
   * Gets the first element in the collection with the provided name.
   */
  getByName(name: string): LayerComp

  /**
   * Removes all member objects from the layerComps collection.
   */
  removeAll(): void
}

type Layers = Layer[] & {
  /**
   * The containing document or layer set.
   */
  readonly parent: Document

  /**
   * The class name of the referenced layers object.
   */
  readonly typename: string

  /**
   * Gets the first element in the layers collection with the provided name.
   */
  getByName(name: string): Layer

  /**
   * Removes all layers from the collection.
   */
  removeAll(): void
}

interface LayerSet extends LayerCommon {
  /**
   * True if the contents in the layers in this set are not editable.
   */
  allLocked: boolean

  /**
   * The art layers in this layer set.
   */
  readonly artLayers: ArtLayers

  /**
   * The blend mode to use for the layer set.
   */
  blendMode: BlendMode

  /**
   * The bounding rectangle of the layer set.
   */
  readonly bounds: UnitValue[]

  /**
   * The channels enabled for the layer set; must be a list of component
   * channels. See Channel.kind.
   */
  enabledChannels: Channel[]

  /**
   * The layers in this layer set.
   */
  readonly layers: Layers

  /**
   * Nested layer sets contained within this layer set. linkedLayers array of
   * ArtLayer and/
   */
  readonly layerSets: LayerSets

  /**
   * The layers linked to this layerSet object.
   */
  readonly or: LayerSet

  /**
   * The name of this layer set.
   */
  name: string

  /**
   * The master opacity of the set.
   */
  opacity: number

  /**
   * The containing document or layer set.
   */
  readonly parent: Document

  /**
   * The class name of the referenced LayerSet object.
   */
  readonly typename: string

  /**
   * True if the set is visible. Methods
   */
  visible: boolean

  /**
   * Creates a duplicate of the object.
   */
  duplicate(relativeObject?: ArtLayer, insertionLocation?: ElementPlacement): LayerSet
  duplicate(relativeObject?: LayerSet, insertionLocation?: ElementPlacement): LayerSet

  /**
   * Links the layer set with another layer.
   */
  link(with_: LayerSet): void

  /**
   * Merges the layerset; returns a reference to the art layer created by this
   * method.
   */
  merge(): ArtLayer

  /**
   * Moves the object.
   */
  move(relativeObject: ArtLayer, insertionLocation: ElementPlacement): void
  move(relativeObject: LayerSet, insertionLocation: ElementPlacement): void

  /**
   * Deletes the object.
   */
  remove(): void

  /**
   * Resizes all layers in the layer set to to the specified dimensions (as a
   * percentage of its current size) and places the layer set in the specified
   * position.
   */
  resize(horizontal?: number, vertical?: number, anchor?: AnchorPosition): void

  /**
   * Rotates all layers in the layer set around the specified anchor point
   * (default: AnchorPosition.MIDDLECENTER)
   */
  rotate(angle: number, anchor?: AnchorPosition): void

  /**
   * Moves the position relative to its current position.
   */
  translate(deltaX?: UnitValue, deltaY?: UnitValue): void

  /**
   * Unlinks the layer set.
   */
  unlink(): void
}

type LayerSets = LayerSet[] & {
  /**
   * The containing document or layer set.
   */
  readonly parent: Document

  /**
   * The class name of the referenced layerSets object.
   */
  readonly typename: string

  /**
   * Creates a new layer set object and adds it to the collection.
   */
  add(): LayerSet

  /**
   * Gets the first element in the collection with the provided name.
   */
  getByName(name: string): LayerSet

  /**
   * Removes all member layer sets, and any layers or layer sets they contain,
   * from the document.
   */
  removeAll(): void
}

interface MeasurementLog {
  /**
   * Export measurement to a file.
   */
  exportMeasurements(file?: File, range?: MeasurementRange, dataPoints?: string[]): void

  /**
   * Delete measurements from the log.
   */
  deleteMeasurements(range?: MeasurementRange): void
}

interface MeasurementScale {
  /**
   * The length in pixels this scale equates to.
   */
  pixelLength: number

  /**
   * The logical length this scale equates to.
   */
  logicalLength: number

  /**
   * The logical units for this scale.
   */
  logicalUnits: string
}

declare class NoColor {
  /**
   * The class name of the referenced noColor object.
   */
  readonly typename: string
}

interface Notifier {
  /**
   * The event identifier, a four-character code or a unique string. For a
   * list of four-character codes, see Appendix A: Event ID Codes.
   */
  readonly event: string

  /**
   * The class identifier, a four-character code or a unique string. When an
   * event applies to multiple types of objects, use this propery to
   * distinguish which object this notifier applies to. For example, the Make
   * event ("Mk ") can apply to documents ("Dcmn"), channels ("Chnl") and
   * other objects.
   */
  readonly eventClass: string

  /**
   * The path to the file to execute when the event occurs and activates the
   * notifier.
   */
  readonly eventFile: File

  /**
   * The containing application.
   */
  readonly parent: Application

  /**
   * The class name of the referenced object.
   */
  readonly typename: string

  /**
   * Deletes this object. You can also remove a Notifier object from the
   * Script Events Manager drop-down list by deleting the file named Script
   * Events Manager.xml from the Photoshop preferences folder. See Adobe
   * Photoshop CC help for more information.
   */
  remove(): void
}

type Notifiers = Notifier[] & {
  /**
   * The notifiers object’s container
   */
  readonly parent: Application

  /**
   * The class name of the referenced notifiers object.
   */
  readonly typename: string

  /**
   * Creates a notifier object and adds it to this collection. event defines
   * the class ID of the event: use a 4-characters code or a unique string.
   * See Appendix A: Event ID Codes. eventFile defines the script file that
   * executes when the event occurs. When an event applies to multiple types
   * of objects, use the eventClass (a 4-character ID or unique string) to
   * distinguish which object this Notifier applies to. For example, the Make
   * event ("Mk ") applies to documents ("Dcmn"), channels ("Chnl") and other
   * objects. Tip: When specifying an event or event calss wtih a 4-character
   * ID code, omit the single quotes in your code.
   */
  add(event: string, eventFile: File, eventClass?: string): Notifier

  /**
   * Removes all member objects from the notifiers collection. You can also
   * remove a notifier object from the Script Events Manager drop-down list by
   * deleting the file named Script Events Manager.xml from the Photoshop
   * preferences folder. See Adobe Photoshop CC help for more information.
   */
  removeAll(): void
}

interface PathItem {
  /**
   * The type.
   */
  kind: PathKind

  /**
   * The name.
   */
  name: string

  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * The contained sub-path objects.
   */
  readonly subPathItems: SubPathItems

  /**
   * The class name of the referenced pathItem object.
   */
  readonly typename: string

  /**
   * Deselects this pathItem object.
   */
  deselect(): void

  /**
   * Duplicates this pathItem object with the new name.
   */
  duplicate(name: string): void

  /**
   * Fills the area enclosed by this path. opacity is a percentage. feather is
   * in pixels. If wholePath is true, all subpaths are used when doing the
   * fill (default: true).
   */
  fillPath(
    fillColor?: SolidColor,
    mode?: ColorBlendMode,
    opacity?: number,
    preserveTransparency?: boolean,
    feather?: number,
    wholePath?: boolean,
    antiAlias?: boolean,
  ): void

  /**
   * Makes this the clipping path for this document. flatness tells the
   * PostScript printer how to approximate curves in the path.
   */
  makeClippingPath(flatness?: number): void

  /**
   * Makes a Selection object whose border is this path. feather is in pixels.
   */
  makeSelection(feather?: number, antiAlias?: boolean, operation?: SelectionType): void

  /**
   * Deletes this object.
   */
  remove(): void

  /**
   * Makes this the active or selected PathItem object.
   */
  select(): void

  /**
   * Strokes the path with the specified tool.
   */
  strokePath(tool?: ToolType, simulatePressure?: boolean): void
}

type PathItems = PathItem[] & {
  /**
   * The pathItems object's container.
   */
  readonly parent: Document

  /**
   * The class name of the referenced pathItems object.
   */
  readonly typename: string

  /**
   * Creates a new path item object and adds it to this collection. A new
   * SubPathItem object is created for each SubPathInfo object provided in
   * entirePath, and those SubPathItem objects are added to the subPathItems
   * collection of the returned PathItem.
   */
  add(name: string, entirePath: SubPathInfo[]): PathItem

  /**
   * Get the first element in the pathItems collection with the provided name.
   */
  getByName(name: string): PathItem

  /**
   * Removes all pathItem objects from the pathItems collection.
   */
  removeAll(): void
}

interface PathPoint {
  /**
   * The X and Y coordinates of the anchor point of the curve.
   */
  readonly anchor: number[][]

  /**
   * The role (corner or smooth) this point plays in the containing path
   * segment.
   */
  readonly kind: PointKind

  /**
   * The location of the left-direction endpoint (’in’ position).
   */
  readonly leftDirection: number[]

  /**
   * The containing subpath object.
   */
  readonly parent: SubPathItem

  /**
   * The location of the right-direction endpoint (’out’ position).
   */
  readonly rightDirection: number[]

  /**
   * The class name of the referenced PathPoint object.
   */
  readonly typename: string
}

declare class PathPointInfo {
  /**
   * The X and Y coordinates of the anchor point of the curve.
   */
  anchor: number[][]

  /**
   * The role (corner or smooth) this point plays in the containing path
   * segment.
   */
  kind: PointKind

  /**
   * The location of the left-direction endpoint (’in’ position).
   */
  leftDirection: number[]

  /**
   * The location of the right-direction endpoint (’out’ position).
   */
  rightDirection: number[]

  /**
   * The class name of the referenced PathPointInfo object. var spi = new
   * SubPathInfo(); spi.closed = false; spi.operation =
   * ShapeOperation.SHAPEXOR; spi.entireSubPath = [startPoint, stopPoint]; var
   * line = doc.pathItems.add("Line", [spi]);
   * line.strokePath(ToolType.PENCIL); line.remove(); };
   * drawLine(app.activeDocument, [100,100], [200,200]);
   */
  readonly typename: string
}

type PathPoints = PathPoint[] & {
  /**
   * The containing subpath object.
   */
  readonly parent: SubPathItem

  /**
   * The class name of the referenced PathPoints object.
   */
  readonly typename: string
}

declare class PDFOpenOptions {
  /**
   * True to use antialias.
   */
  antiAlias: boolean

  /**
   * The number of bits per channel. constrainProportions boolean DEPRECATED
   * for Adobe Photoshop CC.
   */
  bitsPerChannel: BitsPerChannelType

  /**
   * The method of cropping to use. height UnitValue DEPRECATED for Adobe
   * Photoshop CC.
   */
  cropPage: CropToType

  /**
   * The color model to use.
   */
  mode: OpenDocumentMode

  /**
   * The name of the object.
   */
  name: string

  /**
   * The page or image to which to open the document, depending on the value
   * of usePageNumber.
   */
  page: number

  /**
   * The resolution of the document (in pixels per inch).
   */
  resolution: number

  /**
   * True to suppress warnings when opening the document.
   */
  suppressWarnings: boolean

  /**
   * The class name of the referenced PDFOpenOptions object.
   */
  readonly typename: string

  /**
   * When true, the page property refers to a page number; when false, it
   * refers to an image number. width UnitValue DEPRECATED for Adobe Photoshop
   * CC.
   */
  usePageNumber: boolean
}

declare class PDFSaveOptions {
  /**
   * True to save the alpha channels with the file.
   */
  alphaChannels: boolean

  /**
   * True to save comments with the file.
   */
  annotations: boolean

  /**
   * True to convert the color profile to a destination profile.
   */
  colorConversion: boolean

  /**
   * True to convert a 16-bit image to 8-bit for better compatibility with
   * other applications.
   */
  convertToEightBit: boolean

  /**
   * Description of the save options to use.
   */
  description: string

  /**
   * Description of the final RGB or CMYK output device, such as a monitor or
   * a press standard. downgradeColorProfile boolean DEPRECATED for Adobe
   * Photoshop CC.
   */
  destinationProfile: string

  /**
   * The down sample method to use.
   */
  downSample: PDFResample

  /**
   * The size to downsample images if they exceed the limit in pixels per
   * inch.
   */
  downSampleSize: number

  /**
   * Limits downsampling or subsampling to images that exceed this value in
   * pixels per inch.
   */
  downSampleSizeLimit: number

  /**
   * True to embed the color profile in the document. embedFonts boolean
   * DEPRECATED for Adobe Photoshop CC.
   */
  embedColorProfile: boolean

  /**
   * True to include a small preview image in Adobe PDF files.
   */
  embedThumbnail: boolean

  /**
   * The type of compression to use (default: PDFEncoding.PDFZIP).
   * interpolation boolean DEPRECATED for Adobe Photoshop CC.
   */
  encoding: PDFEncoding

  /**
   * The quality of the produced image, which is inversely proportionate to
   * the compression amount. Valid only when encoding = PDFEncoding.JPEG .
   */
  jpegQuality: number

  /**
   * True to save the document’s layers.
   */
  layers: boolean

  /**
   * True to improve performance of PDF files on Web servers.
   */
  optimizeForWeb: boolean

  /**
   * An optional comment field for inserting descriptions of the output
   * condition. The text is stored in the PDF/X file.
   */
  outputCondition: string

  /**
   * Indentifier for the output condition.
   */
  outputConditionID: string

  /**
   * The PDF version to make the document compatible with.
   */
  PDFCompatibility: PDFCompatibility

  /**
   * The PDF standard to make the document compatible with.
   */
  PDFStandard: PDFStandard

  /**
   * True to reopen the PDF in Adobe Photoshop CC with native Photoshop data
   * intact.
   */
  preserveEditing: boolean

  /**
   * The preset file to use for settings. Note: This option overrides other
   * settings.
   */
  presetFile: string

  /**
   * True to show which profiles to include.
   */
  profileInclusionPolicy: boolean

  /**
   * URL where the output condition is registered.
   */
  registryName: string

  /**
   * True to save spot colors.
   */
  spotColors: boolean

  /**
   * Compression option. Valid only when encoding = PDFEncoding.JPEG2000.
   * transparency boolean DEPRECATED for Adobe Photoshop CC.
   */
  tileSize: number

  /**
   * The class name of the referenced PDFSaveOptions object. useOutlines
   * boolean DEPRECATED for Adobe Photoshop CC. vectorData boolean DEPRECATED
   * for Adobe Photoshop CC.
   */
  readonly typename: string

  /**
   * True to open the saved PDF in Adobe Acrobat.
   */
  view: boolean
}

declare class PhotoCDOpenOptions {
  /**
   * The profile to use when reading the image.
   */
  colorProfileName: string

  /**
   * The colorspace for the image.
   */
  colorSpace: PhotoCDColorSpace

  /**
   * The image orientation.
   */
  orientation: Orientation

  /**
   * The image dimensions.
   */
  pixelSize: PhotoCDSize

  /**
   * The image resolution (in pixels per inch).
   */
  resolution: number

  /**
   * The class name of the referenced photoCDOpenOptions object.
   */
  readonly typename: string
}

declare class PhotoshopSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * True to save the annotations.
   */
  annotations: boolean

  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * True to preserve the layers.
   */
  layers: boolean

  /**
   * True to save the spot colors.
   */
  spotColors: boolean

  /**
   * The class name of the referenced photoshopSaveOptions object.
   */
  readonly typename: string
}

declare class PICTFileSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * The type of compression to use (default: PICTCompression.NONE).
   */
  compression: PICTCompression

  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * The number of bits per pixel.
   */
  resolution: PICTBitsPerPixels

  /**
   * The class name of the referenced PICTFileSaveOptions object.
   */
  readonly typename: string
}

declare class PICTResourceSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * The type of compression to use (default: PICTCompression.NONE).
   */
  compression: PICTCompression

  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * The name of the PICT resource.
   */
  name: string

  /**
   * The number of bits per pixel.
   */
  resolution: PICTBitsPerPixels

  /**
   * The ID of the PICT resource (default: 128).
   */
  resourceID: number

  /**
   * The class name of the referenced PICTResourceSaveOptions object.
   */
  readonly typename: string
}

declare class PicturePackageOptions {
  /**
   * The content information (default: PicturePackageTextType.NONE).
   */
  content: PicturePackageTextType

  /**
   * True if all layers in the final document are flattened (default: true).
   */
  flatten: boolean

  /**
   * The font used for security text (default: GalleryFontType.ARIAL).
   */
  font: GalleryFontType

  /**
   * The font size used for security text (default: 12).
   */
  fontSize: number

  /**
   * The layout to use to generate the picture package (default: "(2)5x7").
   */
  layout: string

  /**
   * Read-write. The color profile to use as the document mode (default:
   * NewDocumentMode.RGB).
   */
  mode: NewDocumentMode

  /**
   * The web page security opacity as a percent (default: 100).
   */
  opacity: number

  /**
   * The resolution of the document in pixels per inch (default: 72.0).
   */
  resolution: number

  /**
   * The picture package custom text. Valid only when content =
   * PicturePackageType.USER.
   */
  text: string

  /**
   * The color to use for security text.
   */
  textColor: RGBColor

  /**
   * The security text position (default: GallerySecurityTextPositionType.
   * CENTERED).
   */
  textPosition: GallerySecurityTextPositionType

  /**
   * The orientation to use for security text (default:
   * GallerySecurityTextRotateType.ZERO).
   */
  textRotate: GallerySecurityTextRotateType

  /**
   * The class name of the referenced PicturePackageOptions object.
   */
  readonly typename: string
}

declare class PixarSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * The class name of the referenced PixarSaveOptions object.
   */
  readonly typename: string
}

declare class PNGSaveOptions {
  /**
   * The compression value (default: 0).
   */
  compression: number

  /**
   * True to interlace rows (default: false).
   */
  interlaced: boolean

  /**
   * The class name of the referenced PNGSaveOptions object.
   */
  readonly typename: string
}

interface Preferences {
  /**
   * The path to an additional plug-in folder. Valid only when
   * useAdditionalPluginFolder = true.
   */
  additionalPluginFolder: File

  /**
   * The preferred policy for writing file extensions in Windows.
   */
  appendExtension: SaveBehavior

  /**
   * True to ask the user to verify layer preservation options when saving a
   * file in TIFF format.
   */
  askBeforeSavingLayeredTIFF: boolean

  /**
   * True to automatically update open documents.
   */
  autoUpdateOpenDocuments: boolean

  /**
   * True to beep when a process finishes.
   */
  beepWhenDone: boolean

  /**
   * True to display component channels in the Channels palette in color.
   */
  colorChannelsInColor: boolean

  /**
   * The preferred color selection tool.
   */
  colorPicker: ColorPicker

  /**
   * The width of the column gutters (in points).
   */
  columnGutter: number

  /**
   * Column width (in points)
   */
  columnWidth: number

  /**
   * True to automatically make the first snapshot when a new document is
   * created.
   */
  createFirstSnapshot: boolean

  /**
   * True if dynamic color sliders appear in the Color palette.
   */
  dynamicColorSliders: boolean

  /**
   * The preferred level of detail in the history log. Valid only when
   * useHistoryLog = true.
   */
  editLogItems: EditLogItemsType

  /**
   * True to retain Adobe Photoshop CC contents on the clipboard after you
   * exit the application.
   */
  exportClipboard: boolean

  /**
   * The preferred type size to use for font previews in the type tool font
   * menus.
   */
  fontPreviewSize: FontPreviewType

  /**
   * True to show image preview as a full size image, false to show thumbnail
   * (in Mac OS only).
   */
  fullSizePreview: boolean

  /**
   * Opacity value as a percentage.
   */
  gamutWarningOpacity: number

  /**
   * The preferred size to use for squares in the grid.
   */
  gridSize: GridSize

  /**
   * The preferred formatting style for non-printing grid lines.
   */
  gridStyle: GridLineStyle

  /**
   * Number of grid subdivisions.
   */
  gridSubDivisions: number

  /**
   * The preferred formatting style for non-printing guide lines.
   */
  guideStyle: GuideLineStyle

  /**
   * True to use icon previews (in Mac OS only).
   */
  iconPreview: boolean

  /**
   * The number of images to hold in the cache.
   */
  imageCacheLevels: number

  /**
   * The preferred policy for writing image previews in Windows.
   */
  imagePreviews: SaveBehavior

  /**
   * The method to use to assign color values to any new pixels created when
   * an image is resampled or resized.
   */
  interpolation: ResampleMethod

  /**
   * True to automatically resize the window when zooming in or out using
   * keyboard shortcuts.
   */
  keyboardZoomResizesWindows: boolean

  /**
   * True to create a thumbnail when saving the image (in Mac OS only).
   */
  macOSThumbnail: boolean

  /**
   * The preferred policy for checking whether to maximize compatibility when
   * opening PSD files.
   */
  maximizeCompatibility: QueryStateType

  /**
   * The maximum percentage of available RAM used by Adobe Photoshop CC (5 -
   * 100).
   */
  maxRAMuse: number

  /**
   * True to allow non-linear history.
   */
  nonLinearHistory: boolean

  /**
   * The number of history states to preserve.
   */
  numberofHistoryStates: number

  /**
   * The preferred type of pointer to use with certain tools.
   */
  otherCursors: OtherPaintingCursors

  /**
   * The preferred type of pointer to use with certain tools.
   */
  paintingCursors: PaintingCursors

  /**
   * The containing application.
   */
  parent: Application

  /**
   * True to halve the resolution (double the size of pixels) to make
   * previews display more quickly.
   */
  pixelDoubling: boolean

  /**
   * The point/pica size.
   */
  pointSize: PointType

  /**
   * The number of items in the recent file list.
   */
  recentFileListLength: number

  /**
   * The unit the scripting system will use when receiving and returning
   * values.
   */
  rulerUnits: Units

  /**
   * Thepreferred location of history log data when saving the history items.
   */
  saveLogItems: SaveLogItemsType

  /**
   * The path to the history log file, when the preferred location is a file.
   */
  saveLogItemsFile: File

  /**
   * True to make new palette locations the default location.
   */
  savePaletteLocations: boolean

  /**
   * True to display Asian text options in the Paragraph palette.
   */
  showAsianTextOptions: boolean

  /**
   * True to list Asian font names in English.
   */
  showEnglishFontNames: boolean

  /**
   * True to display slice numbers in the document window when using the
   * Slice tool.
   */
  showSliceNumber: boolean

  /**
   * True to show pop up definitions on mouse over.
   */
  showToolTips: boolean

  /**
   * True to use curly, false to use straight quote marks.
   */
  smartQuotes: boolean

  /**
   * Size of the small font used in panels and dialogs.
   */
  textFontSize: FontSize

  /**
   * The class name of the referenced preferences object.
   */
  readonly typename: string

  /**
   * The preferred unit for text character measurements.
   */
  typeUnits: TypeUnits

  /**
   * True to use an additional folder for compatible plug-ins stored with a
   * different application.
   */
  useAdditionalPluginFolder: boolean

  /**
   * True to create a log file for history states.
   */
  useHistoryLog: boolean

  /**
   * True to use lowercase for file extensions.
   */
  useLowerCaseExtension: boolean

  /**
   * True to enable cycling through a set of hidden tools.
   */
  useShiftKeyForToolSwitch: boolean

  /**
   * True to enable Adobe Photoshop CC to send transparency information to
   * your computer’s video board. (Requires hardware support.)
   */
  useVideoAlpha: boolean

  /**
   * True to create a thumbnail when saving the image in Windows. (Requires
   * hardware support.)
   */
  windowsThumbnail: boolean
}

declare class PresentationOptions {
  /**
   * True to auto advance images when when viewing the presentation (default:
   * true). Valid only when presentation = true.
   */
  autoAdvance: boolean

  /**
   * True to include the file name for the image (default: false).
   */
  includeFilename: boolean

  /**
   * The time in seconds before the view is auto advanced (default: 5). Valid
   * only when autoAdvance = true.
   */
  interval: number

  /**
   * True to begin the presentation again after the last page (default:
   * false). Valid only when autoAdvance = true.
   */
  loop: boolean

  /**
   * The magnification type to use when viewing the image.
   */
  magnification: MagnificationType

  /**
   * Options to use when creating the PDF file.
   */
  PDFFileOptions: PDFSaveOptions

  /**
   * True if the output will be a presentation (default: false); when false,
   * the output is a Multi-Page document.
   */
  presentation: boolean

  /**
   * The method for transition from one image to the next (default:
   * TransitionType.NONE). Valid only when autoAdvance = true. .
   */
  transition: TransitionType

  /**
   * The class name of the referenced PresentationOptions object.
   */
  readonly typename: string
}

declare class RawFormatOpenOptions {
  /**
   * The number of bits for each channel. The only valid values are
   * BitsPerChannelType.EIGHT or BitsPerChannelType.SIXTEEN.
   */
  bitsPerChannel: number

  /**
   * The order in which multibyte values are read. Valid only when
   * bitsPerChannel = BitsPerChannelType.SIXTEEN.
   */
  byteOrder: ByteOrder

  /**
   * The number of channels in the image. The value of cannot exceed the
   * number of channels in the image. When bitsPerChannel =
   * BitsPerChannelType.SIXTEEN, the only valid values are 1, 3, or 4.
   */
  channelNumber: number

  /**
   * The number of bytes of information that will appear in the file before
   * actual image information begins; that is, the number of zeroes inserted
   * at the beginning of the file as placeholders.
   */
  headerSize: number

  /**
   * The height of the image (in pixels).
   */
  height: number

  /**
   * True to store color values sequentially.
   */
  interleaveChannels: boolean

  /**
   * True to retain the header when saving. Valid only when headerSize is 1
   * or greater.
   */
  retainHeader: boolean

  /**
   * The class name of the referenced RawFormatOpenOptions object.
   */
  readonly typename: string

  /**
   * The image width in pixels.
   */
  width: number
}

declare class RawSaveOptions {
  /**
   * True if alpha channels should be saved.
   */
  alphaChannels: boolean

  /**
   * True if the spot colors should be saved.
   */
  spotColors: boolean

  /**
   * The class name of the referenced RawSaveOptions object.
   */
  readonly typename: string
}

declare class RGBColor {
  /**
   * The blue color value (default: 255).
   */
  blue: number

  /**
   * The green color value (default: 255)
   */
  green: number

  /**
   * The hexadecimal representation of the color.
   */
  hexValue: string

  /**
   * The red color value (default: 255)
   */
  red: number

  /**
   * The class name of the referenced RGBColor object.
   */
  readonly typename: string
}

interface Selection {
  /**
   * The bounding rectangle of the entire selection.
   */
  readonly bounds: UnitValue[]

  /**
   * The object's container.
   */
  readonly parent: Document

  /**
   * True if the bounding rectangle is a solid.
   */
  readonly solid: boolean

  /**
   * The class name of the referenced selection object.
   */
  readonly typename: string

  /**
   * Clears the selection and does not copy it to the clipboard.
   */
  clear(): void

  /**
   * Contracts (reduces) the selection by the specified amount.
   */
  contract(by: UnitValue): void

  /**
   * Copies the selection to the clipboard. When the optional argument is used
   * and set to true, a merged copy is performed (all visible layers in the
   * selection are copied).
   */
  copy(merge?: boolean): void

  /**
   * Clears the current selection and copies it to the clipboard.
   */
  cut(): void

  /**
   * Deselects the current selection.
   */
  deselect(): void

  /**
   * Expands the selection by the specified amount.
   */
  expand(by: UnitValue): void

  /**
   * Feathers the edges of the selection by the specified amount.
   */
  feather(by: UnitValue): void

  /**
   * Fills the selection. opacity is a percentage value.
   */
  fill(filltype: SolidColor, mode?: ColorBlendMode, opacity?: number, preserveTransparency?: boolean): void

  /**
   * Grows the selection to include all adjacent pixels falling within the
   * specified tolerance range.
   */
  grow(tolerance: number, antiAlias: boolean): void

  /**
   * Inverts the selection (deselects the selection and selects the rest of
   * the layer or document). Tip: To flip the selection shape, see rotate.
   */
  invert(): void

  /**
   * Loads the selection from the specified channel.
   */
  load(from: Channel, combination?: SelectionType, inverting?: boolean): void

  /**
   * Makes this selection item the work path for this document.
   */
  makeWorkPath(tolerance?: number): void

  /**
   * Resizes the selected area to the specified dimensions and anchor position.
   */
  resize(horizontal?: number, vertical?: number, anchor?: AnchorPosition): void

  /**
   * Changes the size of the selection to the specified dimensions around the
   * specified anchor.
   */
  resizeBoundary(horizontal?: number, vertical?: number, anchor?: AnchorPosition): void

  /**
   * Rotates the selection by the specified amount around the specified anchor
   * point.
   */
  rotate(angle: number, anchor?: AnchorPosition): void

  /**
   * Rotates the boundary of the selection around the specified anchor.
   */
  rotateBoundary(angle: number, anchor?: AnchorPosition): void

  /**
   * Selects the specified region. The region parameter is an array of four
   * coordinates, [left, top, right, bottom].
   */
  select(region: number[][], type?: SelectionType, feather?: number, antiAlias?: boolean): void

  /**
   * Selects the entire layer.
   */
  selectAll(): void

  /**
   * Selects the selection border only (in the specified width); subsequent
   * actions do not affect the selected area within the borders.
   */
  selectBorder(width: UnitValue): void

  /**
   * Grows the selection to include pixels throughout the image falling within
   * the tolerance range.
   */
  similar(tolerance: number, antiAlias: boolean): void

  /**
   * Cleans up stray pixels left inside or outside a color-based selection
   * (within the radius specified in pixels).
   */
  smooth(radius: number): void

  /**
   * Saves the selection as a channel.
   */
  store(into: Channel, combination?: SelectionType): void

  /**
   * Strokes the selection border. opacity is a percentage value.
   */
  stroke(
    strokeColor: SolidColor,
    width: number,
    location?: StrokeLocation,
    mode?: ColorBlendMode,
    opacity?: number,
    preserveTransparency?: boolean,
  ): void

  /**
   * Moves the entire selection relative to its current position.
   */
  translate(deltaX?: UnitValue, deltaY?: UnitValue): void

  /**
   * Moves the selection relative to its current position.
   */
  translateBoundary(deltaX?: UnitValue, deltaY?: UnitValue): void
}

declare class SGIRGBSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * True to save the spot colors.
   */
  spotColors: boolean

  /**
   * The class name of the referenced SGIRGBSaveOptions object.
   */
  readonly typename: string
}

declare class SolidColor {
  /**
   * The CMYK color mode.
   */
  cmyk: CMYKColor

  /**
   * The Grayscale color mode.
   */
  gray: GrayColor

  /**
   * The HSB color mode.
   */
  hsb: HSBColor

  /**
   * The LAB color mode.
   */
  lab: LabColor

  /**
   * The color model.
   */
  model: ColorModel

  /**
   * The nearest web color to the current color.
   */
  readonly nearestWebColor: RGBColor

  /**
   * The RGB color mode.
   */
  rgb: RGBColor

  /**
   * The class name of the referenced SolidColor object.
   */
  readonly typename: string

  /**
   * True if the SolidColor object is visually equal to the specified color.
   */
  isEqual(color: SolidColor): boolean
}

declare class SubPathInfo {
  /**
   * True if the path describes an enclosed area.
   */
  closed: boolean

  /**
   *
   */
  entireSubPath: PathPoint[]

  /**
   * The subpath’s operation on other subpaths. Specifies how to combine the
   * shapes if the destination path already has a selection.
   */
  operation: ShapeOperation

  /**
   * The class name of the referenced SubPathInfo object.
   */
  readonly typename: string
}

interface SubPathItem {
  /**
   * True if the path is closed.
   */
  readonly closed: boolean

  /**
   * How this object behaves when it intersects another SubPathItem object.
   * Specifies how to combine the shapes if the destination path already has a
   * selection.
   */
  readonly operation: ShapeOperation

  /**
   * The object's container.
   */
  readonly parent: PathItem

  /**
   * The PathPoints collection.
   */
  readonly pathPoints: PathPoints

  /**
   * The class name of the referenced SubPathItem object.
   */
  readonly typename: string
}

type SubPathItems = SubPathItem[] & {
  /**
   * The containing path item.
   */
  readonly parent: PathItem

  /**
   * The class name of the referenced SubPathItems object.
   */
  readonly typename: string
}

declare class TargaSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * The number of bits per pixel (default: TargaBitsPerPixels.TWENTYFOUR).
   */
  resolution: TargaBitsPerPixels

  /**
   * True to use RLE compression (default: true).
   */
  rleCompression: boolean

  /**
   * The class name of the referenced TargaSaveOptions object.
   */
  readonly typename: string
}

interface TextFont {
  /**
   * The font family.
   */
  readonly family: string

  /**
   * The name of the font.
   */
  readonly name: string

  /**
   * The containing application.
   */
  readonly parent: Application

  /**
   * The PostScript name of the font.
   */
  readonly postScriptName: string

  /**
   * The font style.
   */
  readonly style: string

  /**
   * The class name of the referenced TextFont object.
   */
  readonly typename: string
}

type TextFonts = TextFont[] & {
  /**
   * The containing application.
   */
  readonly parent: Application

  /**
   * The class name of the referenced TextFonts object.
   */
  readonly typename: string

  /**
   * Gets the first element in the TextFonts collection with the provided name.
   */
  getByName(name: string): TextFont
}

interface TextItem {
  /**
   * True to use alternate ligatures. Note: Alternate ligatures are the same
   * as Discretionary Ligatures. See Adobe Photoshop CC Help for more
   * information.
   */
  alternateLigatures: boolean

  /**
   * The method of anti aliasing to use.
   */
  antiAliasMethod: AntiAlias

  /**
   * The auto kerning option to use.
   */
  autoKerning: AutoKernType

  /**
   * The percentage to use for auto (default) leading (in points). Valid only
   * when useAutoLeading = true.
   */
  autoLeadingAmount: number

  /**
   * The unit value to use in the baseline offset of text.
   */
  baselineShift: UnitValue

  /**
   * The text case.
   */
  capitalization: TextCase

  /**
   * The text color.
   */
  color: SolidColor

  /**
   * The actual text in the layer.
   */
  contents: string

  /**
   * The desired amount by which to scale the horizontal size of the text
   * letters. A percentage value; at 100, the width of characters is not
   * scaled. Valid only when justification = Justification.CENTERJUSTIFIED,
   * FULLYJUSTIFIED, LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When
   * used, the minimumGlyphScaling and maximumGlyphScaling values are also
   * required.
   */
  desiredGlyphScaling: number

  /**
   * The amount of space between letters (at 0, no space is added between
   * letters). Equivalent to Letter Spacing in the Justification dialog
   * (Select Justification on the Paragraphs palette menu). Valid only when
   * justification = Justification.CENTERJUSTIFIED, FULLYJUSTIFIED,
   * LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When used, the
   * minimumLetterScaling and maximumLetterScaling values are also required.
   */
  desiredLetterScaling: number

  /**
   * The amount (percentage) of space between words (at 100, no additional
   * space is added between words). Equivalent to Word Spacing in the
   * Justification dialog (Select Justification on the Paragraphs palette
   * menu). Valid only when justification = Justification.CENTERJUSTIFIED,
   * FULLYJUSTIFIED, LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When
   * used, the minimumWordScaling and maximumWordScaling values are also
   * required.
   */
  desiredWordScaling: number

  /**
   * The text orientation.
   */
  direction: Direction

  /**
   * True to use faux bold (default: false). Setting this to true is
   * equivalent to selecting text and clicking Faux Bold in the Character
   * palette.
   */
  fauxBold: boolean

  /**
   * True to use faux italic (default: false). Setting this to true is
   * equivalent to selecting text and clicking Faux Italic in the Character
   * palette.
   */
  fauxItalic: boolean

  /**
   * The amount (unit value) to indent the first line of paragraphs.
   */
  firstLineIndent: UnitValue

  /**
   * The text face of the character. Use the PostScript Name of the font. See
   * TextFont and use the postScriptName property.
   */
  font: string

  /**
   * True to use Roman hanging punctuation.
   */
  hangingPunctuation: boolean

  /**
   * The height of the bounding box (unit value) for paragraph text. Valid
   * only when kind = TextType.PARAGRAPHTEXT.
   */
  height: UnitValue

  /**
   * Character scaling (horizontal) in proportion to verticalScale (a
   * percentage value).
   */
  horizontalScale: number

  /**
   * The number of letters after which hyphenation in word wrap is allowed.
   */
  hyphenateAfterFirst: number

  /**
   * The number of letters before which hyphenation in word wrap is allowed.
   */
  hyphenateBeforeLast: number

  /**
   * True to allow hyphenation in word wrap of capitalized words.
   */
  hyphenateCapitalWords: boolean

  /**
   * The minimum number of letters a word must have in order for hyphenation
   * in word wrap to be allowed.
   */
  hyphenateWordsLongerThan: number

  /**
   * True to use hyphenation in word wrap. hyphenationZone UnitValue [0..720]
   * pica Read-write. The distance at the end of a line that will cause a word
   * to break in unjustified type.
   */
  hyphenation: boolean

  /**
   * The maximum number of consecutive lines that can end with a hyphenated
   * word.
   */
  hyphenLimit: number

  /**
   * The paragraph justification.
   */
  justification: Justification

  /**
   * The text-wrap type.
   */
  kind: TextType

  /**
   * The language to use.
   */
  language: Language

  /**
   * The leading amount.
   */
  leading: UnitValue

  /**
   * The amoun of space to indent text from the left.
   */
  leftIndent: UnitValue

  /**
   * True to use ligatures.
   */
  ligatures: boolean

  /**
   * The maximum amount to scale the horizontal size of the text letters (a
   * percentage value; at 100, the width of characters is not scaled). Valid
   * only when justification = Justification.CENTERJUSTIFIED, FULLYJUSTIFIED,
   * LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When used, the
   * minimumGlyphScaling and desiredGlyphScaling values are also required.
   */
  maximumGlyphScaling: number

  /**
   * The maximum amount of space to allow between letters (at 0, no space is
   * added between letters). Equivalent to Letter Spacing in the Justification
   * dialog (Select Justification on the Paragraphs palette menu). Valid only
   * when justification = Justification.CENTERJUSTIFIED, FULLYJUSTIFIED,
   * LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When used, the
   * minimumLetterScaling and desiredLetterScaling values are also required.
   */
  maximumLetterScaling: number

  /**
   * The maximum amount of space to allow between words (a percentage value;
   * at 100, no additional space is added between words). Equivalent to Word
   * Spacing in the Justification dialog (Select Justification on the
   * Paragraphs palette menu). Valid only when justification =
   * Justification.CENTERJUSTIFIED, FULLYJUSTIFIED, LEFTJUSTIFIED, or
   * Justification.RIGHTJUSTIFIED. When used, the minimumWordScaling and
   * desiredWordScaling values are also required.
   */
  maximumWordScaling: number

  /**
   * The minimum amount to scale the horizontal size of the text letters (a
   * percentage value; at 100, the width of characters is not scaled). Valid
   * only when justification = Justification.CENTERJUSTIFIED, FULLYJUSTIFIED,
   * LEFTJUSTIFIED, or Justification.RIGHTJUSTIFIED. When used, the
   * maximumGlyphScaling and desiredGlyphScaling values are also required.
   */
  minimumGlyphScaling: number

  /**
   * The minimum amount of space to allow between letters (a percentage
   * value; at 0, no space is removed between letters). Equivalent to Letter
   * Spacing in the Justification dialog (Select Justification on the
   * Paragraphs palette menu). Valid only when justification =
   * Justification.CENTERJUSTIFIED, FULLYJUSTIFIED, LEFTJUSTIFIED, or
   * Justification.RIGHTJUSTIFIED. When used, the maximumLetterScaling and
   * desiredLetterScaling values are also required.
   */
  minimumLetterScaling: number

  /**
   * The minimum amount of space to allow between words (a percentage value;
   * at 100, no additional space is removed between words). Equivalent to Word
   * Spacing in the Justification dialog (Select Justification on the
   * Paragraphs palette menu). Valid only when justification =
   * Justification.CENTERJUSTIFIED, FULLYJUSTIFIED, LEFTJUSTIFIED, or
   * Justification.RIGHTJUSTIFIED. When used, the maximumWordScaling and
   * desiredWordScaling values are also required.
   */
  minimumWordScaling: number

  /**
   * True to disallow line breaks in this text. Tip: When true for many
   * consecutive characters, can prevent word wrap and thus may prevent some
   * text from appearing on the screen.
   */
  noBreak: boolean

  /**
   * True to use old style type.
   */
  oldStyle: boolean

  /**
   * The containing layer.
   */
  parent: ArtLayer

  /**
   * The position of origin for the text. The array members specify the X and
   * Y coordinates. Equivalent to clicking the text tool at a point in the
   * document to create the point of origin for text.
   */
  position: UnitValue[]

  /**
   * The amount of space to indent text from the right.
   */
  rightIndent: UnitValue

  /**
   * The font size in UnitValue . NOTE: Type was points for CS3 and older..
   */
  size: UnitValue

  /**
   * The amount of space to use after each paragraph.
   */
  spaceAfter: UnitValue

  /**
   * The amount of space to use before each paragraph.
   */
  spaceBefore: UnitValue

  /**
   * The text strike-through option to use.
   */
  strikeThru: StrikeThruType

  /**
   * The composition method to use to evaluate line breaks and optimize the
   * specified hyphenation and justification options. Valid only when kind =
   * TextType.PARAGRAPHTEXT.
   */
  textComposer: TextComposer

  /**
   * The amount of uniform spacing between multiple characters. Tracking
   * units are 1/1000 of an em space. The width of an em space is relative to
   * the current type size. In a 1-point font, 1 em equals 1 point; in a
   * 10-point font, 1 em equals 10 points. So, for example, 100 units in a
   * 10-point font are equivalent to 1 point.
   */
  tracking: number

  /**
   * The class name of the referenced textItem object.
   */
  readonly typename: string

  /**
   * The text underlining options.
   */
  underline: UnderlineType

  /**
   * True to use a font's built-in leading information.
   */
  useAutoLeading: boolean

  /**
   * Vertical character scaling in proportion to horizontalScale (a
   * percentage value).
   */
  verticalScale: number

  /**
   * The warp bend percentage.
   */
  warpBend: number

  /**
   * The warp direction.
   */
  warpDirection: Direction

  /**
   * The horizontal distortion of the warp (a percentage value).
   */
  warpHorizontalDistortion: number

  /**
   * The style of warp to use.
   */
  warpStyle: WarpStyle

  /**
   * The vertical distortion of the warp (a percentage value).
   */
  warpVerticalDistortion: number

  /**
   * The width of the bounding box for paragraph text. Valid only when kind =
   * TextType.PARAGRAPHTEXT. Methods
   */
  width: UnitValue

  /**
   * Converts the text item and its containing layer to a fill layer with the
   * text changed to a clipping path.
   */
  convertToShape(): void

  /**
   * Creates a clipping path from the outlines of the actual text items (such
   * as letters or words).
   */
  createPath(): void
}

declare class TiffSaveOptions {
  /**
   * True to save the alpha channels.
   */
  alphaChannels: boolean

  /**
   * True to save the annotations.
   */
  annotations: boolean

  /**
   * The order in which the document’s multibyte values are read (default:
   * ByteOrder.MACOS in Mac OS, ByteOrder.IBM in Windows).
   */
  byteOrder: ByteOrder

  /**
   * True to embed the color profile in the document.
   */
  embedColorProfile: boolean

  /**
   * The compression type (default: TIFFEncoding.NONE).
   */
  imageCompression: TIFFEncoding

  /**
   * True if the channels in the image will be interleaved.
   */
  interleaveChannels: boolean

  /**
   * The quality of the produced image, which is inversely proportionate to
   * the amount of JPEG compression. Valid only when imageCompression =
   * TIFFEncoding.JPEG.
   */
  jpegQuality: number

  /**
   * The method of compression to use when saving layers (as opposed to
   * saving composite data). Valid only when layers = true.
   */
  layerCompression: LayerCompression

  /**
   * True to save the layers.
   */
  layers: boolean

  /**
   * True to preserve multi-resolution information (default: false).
   */
  saveImagePyramid: boolean

  /**
   * True to save the spot colors.
   */
  spotColors: boolean

  /**
   * True to save the transparency as an additional alpha channel when the
   * file is opened in another application.
   */
  transparency: boolean

  /**
   * The class name of the referenced TiffSaveOptions object.
   */
  readonly typename: string
}

interface UnitValue {}

interface xmpMetadata {
  /**
   * The containing document.
   */
  readonly parent: Document

  /**
   * A string containing the XMP metadata in XML (RDF) format. See the XMP
   * Specification for details of this format.
   */
  rawData: string
}
